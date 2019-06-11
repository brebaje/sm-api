const DBService = require('../services/database');
const config = require('../config');

const collection = 'players';
// TODO refactor
const credentials = config.DB_USER ? `${config.DB_USER}:${config.DB_PASS}@` : '';
const uri = `mongodb://${credentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

module.exports = {
  getPlayer(nick) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDoc(collection, { nick });
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
    const database = new DBService();

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

  getAllRetired() {
    return this.getPlayers({ active: false });
  },
};
