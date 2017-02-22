// Loads config based on Environment variable
const dev = require('./dev');
const prod = require('./prod');

switch (process.env.SM_ENV) {
  case 'prod':
  case 'production':
    module.exports = prod;
    break;
  case 'dev':
  default:
    module.exports = dev;
    break;
}
