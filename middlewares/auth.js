const jwt = require('jsonwebtoken');
const NotAuthenticated = require('../error/NotAuthenticated');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    next(new NotAuthenticated('Необходима авторизация'));
    return;
  }

  const token = authorization.replace();

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new NotAuthenticated('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
