const DBService = require('../services/database');
const config = require('../config');

const collection = 'history';
// TODO refactor
const credentials = config.DB_USER ? `${config.DB_USER}:${config.DB_PASS}@` : '';
const uri = `mongodb://${credentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

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
