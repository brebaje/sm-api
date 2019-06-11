const express = require('express');
const path = require('path');
const logger = require('../utils/log');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'), null, (err) => {
    if (err) {
      logger.log(err);
      res.status(err.status).end();
    }
  });
});

router.get('/healthcheck', (req, res) => {
  res.status(200).end();
});

router.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/docs.html'), null, (err) => {
    if (err) {
      logger.log(err);
      res.status(err.status).end();
    }
  });
});

module.exports = router;
