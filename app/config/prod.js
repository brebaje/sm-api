module.exports = {
  // App
  ENV: 'prod',
  PORT: process.env.PORT || 80,
  // Database
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
};
