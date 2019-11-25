const DBService = require('../services/database');

const collection = 'history';

module.exports = {
  getHistory() {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.findDocuments(collection, {});
        })
        .then((history) => {
          resolve(history);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          database.close();
        });
    });
  },
};
