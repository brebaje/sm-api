const DBService = require('../services/database');
const config = require('../config');

const collection = 'history';
const uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

module.exports = {
  getHistory() {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDocuments(collection, {});
        })
        .then((history) => {
          database.close();

          resolve(history);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
