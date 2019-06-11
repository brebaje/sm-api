const express = require('express');
const history = require('../models/history');
const logger = require('../utils/log');

const router = express.Router();

router.get('/', (req, res) => {
  history.getHistory()
    .then((dbHistory) => {
      res.status(200);
      res.json(dbHistory);

      return res;
    })
    .catch((error) => {
      logger.log(error.message);
    });
});

module.exports = router;
