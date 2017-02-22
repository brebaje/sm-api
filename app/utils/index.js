const moment = require('moment');

module.exports = {

  timestamp() {
    return `[${moment().format('DD-MM-YYYY @ HH:mm')}]`;
  },

};
