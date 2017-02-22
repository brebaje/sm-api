/*
  This module provides helper methods to allow the application to interact with a MongoDB database.

  Adapted from:
  https://github.com/am-MongoDB/MongoDB-Mongopop/blob/master/javascripts/db.js
 */

'use strict'; // eslint-disable-line strict, lines-around-directive

const MongoClient = require('mongodb').MongoClient;
const logger = require('./log');

class DB {
  constructor() {
    // The MongoDB database connection
    this.db = null;
  }

  connect(uri) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        // Already connected
        resolve();
      }
      else {
        MongoClient.connect(uri)
          .then((database) => {
            this.db = database;

            resolve();
          })
          .catch((error) => {
            logger.log(`[database.js] ERROR connecting: ${error.message}`);

            reject(error);
          });
      }
    });
  }

  close() {
    // Close the database connection. This if the connection isn't open
    // then just ignore, if closing a connection fails then log the fact
    // but then move on. This method returns nothing – the caller can fire
    // and forget.

    if (this.db) {
      this.db.close()
        .then(() => {
        })
        .catch((error) => {
          logger.log(`[database.js] ERROR closing the connection: ${error.message}`);
        });
    }
  }

  countDocuments(collection) {
    // Returns a promise which resolves to the number of documents in the
    // specified collection.
    const db = this.db;

    return new Promise((resolve, reject) => {
      // {strict:true} means that the count operation will fail if the collection
      // doesn't yet exist

      db.collection(collection, { strict: true }, (error, coll) => {
        if (error) {
          logger.log(`[database.js] ERROR accessing collection ${collection}: ${error.message}`);
          reject(error);
        }
        else {
          coll.count()
            .then((count) => {
              resolve(count);
            })
            .catch((err) => {
              logger.log(`[database.js] ERROR countDocuments failed: ${err.message}`);
              reject(err);
            });
        }
      });
    });
  }
}

module.exports = DB;
