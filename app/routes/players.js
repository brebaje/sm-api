const express = require('express');
const players = require('../models/players');

const router = express.Router();

router.get('/', (req, res) => {
  players.getAll()
    .then((data) => {
      res.status(200);
      res.json(data);

      return res;
    });
});

router.get('/active', (req, res) => {
  players.getAllActive()
    .then((data) => {
      res.status(200);
      res.json(data);

      return res;
    });
});

router.get('/retired', (req, res) => {
  players.getAllRetired()
    .then((data) => {
      res.status(200);
      res.json(data);
    });
});

router.get('/:nick', (req, res) => {
  players.getPlayer(req.params.nick)
    .then((dbPlayer) => {
      res.status(200);
      res.json(dbPlayer);

      return res;
    });
});

module.exports = router;
