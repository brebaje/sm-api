const DBService = require('../services/database');

const collection = 'players';

module.exports = {
  getPlayer(nick) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.findDoc(collection, { nick });
        })
        .then((dbPlayer) => {
          resolve(dbPlayer);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          database.close();
        });
    });
  },

  getPlayers(criteria) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.findDocuments(collection, criteria);
        })
        .then((players) => {
          resolve(players);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          database.close();
        });
    });
  },

  getAll() {
    return this.getPlayers({});
  },

  getAllActive() {
    return this.getPlayers({ active: true });
  },

  getAllRetired() {
    return this.getPlayers({ active: false });
  },
};
