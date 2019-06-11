const express = require('express');
const players = require('../models/players');
const logger = require('../utils/log');

const router = express.Router();

router.get('/', (req, res) => {
  players.getAll()
    .then((data) => {
      res.status(200);
      res.json(data);

      return res;
    })
    .catch((error) => {
      logger.log(error.message);
    });
});

router.get('/active', (req, res) => {
  players.getAllActive()
    .then((data) => {
      res.status(200);
      res.json(data);

      return res;
    })
    .catch((error) => {
      logger.log(error.message);
    });
});

router.get('/retired', (req, res) => {
  players.getAllRetired()
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      logger.log(error.message);
    });
});

router.get('/:nick', (req, res) => {
  players.getPlayer(req.params.nick)
    .then((dbPlayer) => {
      res.status(200);
      res.json(dbPlayer);

      return res;
    })
    .catch((error) => {
      logger.log(error.message);
    });
});

module.exports = router;
