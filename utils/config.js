const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const dbConnection = 'mongodb://127.0.0.1/bitfilmsdb';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  PORT,
  limiter,
  dbConnection,
};
