const utils = require('../utils');

module.exports = {

  log(message) {
    if (process.env.SILENT) {
      return;
    }

    console.log(`${utils.timestamp()} ${message}`); // eslint-disable-line no-console
  },

};
