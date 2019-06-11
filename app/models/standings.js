const DBService = require('../services/database');
const config = require('../config');

const collection = 'standings';
// TODO refactor
const credentials = config.DB_USER ? `${config.DB_USER}:${config.DB_PASS}@` : '';
const uri = `mongodb://${credentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

module.exports = {
  getStandingsInfo() {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.countByField(collection, 'Temporada');
        })
        .then((info) => {
          database.close();

          resolve(info);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getStandings(season) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDocuments(collection, { Temporada: season });
        })
        .then((standings) => {
          database.close();

          resolve(standings);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getStandingsForNumber(season, number) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect(uri)
        .then(() => {
          return database.findDoc(collection, { Temporada: season, Numero: number });
        })
        .then((standings) => {
          database.close();

          resolve(standings);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
