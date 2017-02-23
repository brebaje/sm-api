const express = require('express');
const player = require('../models/player');

const router = express.Router();

router.get('/', (req, res) => {
  player.getAllActive()
    .then((players) => {
      res.status(200);
      res.json(players);

      return res;
    });
});

router.get('/historic', (req, res) => {
  player.getAll()
    .then((players) => {
      res.status(200);
      res.json(players);

      return res;
    });
});

router.get('/:player', (req, res) => {
  player.getPlayer(req.params.player)
    .then((dbPlayer) => {
      res.status(200);
      res.json(dbPlayer);

      return res;
    });
});

module.exports = router;
