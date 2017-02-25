const express = require('express');
const standings = require('../models/standings');
const ValidationService = require('../services/validation');

const router = express.Router();

// TODO
// validate season ?
// check season + number has data ?
// catch and return error

router.get('/', (req, res) => {
  standings.getStandingsInfo()
    .then((dbStandings) => {
      res.status(200);
      res.json(dbStandings);

      return res;
    });
});

router.get('/:season', (req, res) => {
  standings.getStandings(req.params.season)
    .then((dbStandings) => {
      res.status(200);
      res.json(dbStandings);

      return res;
    });
});

router.get('/:season/:number', (req, res) => {
  const season = req.params.season;
  const number = parseInt(req.params.number, 10);

  // validate :number is an integer between 1-34
  if (!ValidationService.validateStandingsNumber(number)) {
    res.status(400);
    res.json({ error: `Invalid standings number value: ${req.params.number}` });

    return res;
  }

  standings.getStandingsForNumber(season, number)
    .then((dbStandings) => {
      res.status(200);
      res.json(dbStandings);

      return res;
    });
});

module.exports = router;
