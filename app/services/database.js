/*
  This module provides helper methods to allow the application to interact with a MongoDB database.

  Adapted from:
  https://github.com/am-MongoDB/MongoDB-Mongopop/blob/master/javascripts/db.js
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const logger = require('../utils/log');

class DB {
  constructor() {
    // The MongoDB database connection
    this.db = null;
  }

  connect() {
    const credentials = config.DB_USER ? `${config.DB_USER}:${config.DB_PASS}@` : '';
    const uri = `mongodb://${credentials}${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

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

  countByField(collection, field) {
    // Returns a promise which resolve to an array of objects
    // { field: 'xx', total: x }

    const db = this.db;

    return new Promise((resolve, reject) => {
      db.collection(collection, { strict: true }, (error, coll) => {
        if (error) {
          logger.log(`[database.js] ERROR accessing collection ${collection}: ${error.message}`);
          reject(error);
        }
        else {
          const result = [];

          coll.aggregate([
            {
              $group: {
                _id: `$${field}`,
                total: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                field: '$_id',
                total: '$total',
              },
            },
            {
              $sort: {
                field: 1,
              },
            },
          ])
            .each((err, doc) => {
              if (err) {
                logger.log(`[database.js] ERROR indexCount failed: ${err.message}`);
                reject(err);
              }
              else if (doc) {
                const resultDoc = {};

                resultDoc[field] = doc.field;
                resultDoc.total = doc.total;

                result.push(resultDoc);
              }
              else {
                // we processed all docs
                resolve(result);
              }
            });
        }
      });
    });
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

  findDocuments(collection, criteria) {
    const db = this.db;

    return new Promise((resolve, reject) => {
      db.collection(collection, { strict: true }, (error, coll) => {
        if (error) {
          logger.log(`[database.js] ERROR accessing collection ${collection}: ${error.message}`);
          reject(error);
        }
        else {
          const docs = coll.find(criteria).toArray();

          resolve(docs);
        }
      });
    });
  }

  findDoc(collection, criteria) {
    const db = this.db;

    return new Promise((resolve, reject) => {
      db.collection(collection, { strict: true }, (error, coll) => {
        if (error) {
          logger.log(`[database.js] ERROR accessing collection ${collection}: ${error.message}`);
          reject(error);
        }
        else {
          const docs = coll.findOne(criteria);

          resolve(docs);
        }
      });
    });
  }
}

module.exports = DB;
