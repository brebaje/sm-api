const express = require('express');
const history = require('../models/history');

const router = express.Router();

router.get('/', (req, res) => {
  history.getHistory()
    .then((dbHistory) => {
      res.status(200);
      res.json(dbHistory);

      return res;
    });
});

module.exports = router;
