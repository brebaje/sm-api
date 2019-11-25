const DBService = require('../services/database');

const collection = 'standings';

module.exports = {
  getStandingsInfo() {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.countByField(collection, 'Temporada');
        })
        .then((info) => {
          resolve(info);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          database.close();
        });
    });
  },

  getStandings(season) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.findDocuments(collection, { Temporada: season });
        })
        .then((standings) => {
          resolve(standings);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          database.close();
        });
    });
  },

  getStandingsForNumber(season, number) {
    const database = new DBService();

    return new Promise((resolve, reject) => {
      database.connect()
        .then(() => {
          return database.findDoc(collection, { Temporada: season, Numero: number });
        })
        .then((standings) => {
          resolve(standings);
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
