const DB = require('../utils/database');
const config = require('../config');

const collection = 'players';
const uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

module.exports = {
  getPlayer(player) {
    const database = new DB();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDoc(collection, { _id: player });
        })
        .then((dbPlayer) => {
          database.close();

          resolve(dbPlayer);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getPlayers(criteria) {
    const database = new DB();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDocuments(collection, criteria);
        })
        .then((players) => {
          database.close();

          resolve(players);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAll() {
    return this.getPlayers({});
  },

  getAllActive() {
    return this.getPlayers({ active: true });
  },
};
