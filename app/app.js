const express = require('express');

// middleware
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('./utils/log');
const config = require('./config');

// routes
const routes = require('./routes');
const history = require('./routes/history');
const player = require('./routes/player');
const standings = require('./routes/standings');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.use('/history', history);
app.use('/player', player);
app.use('/standings', standings);

// listen for connections
app.listen(config.PORT, () => {
  logger.log(`Listening in http://localhost: ${config.PORT}`);
});

// for mocha tests purposes
module.exports = app;
