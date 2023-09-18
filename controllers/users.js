const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/users');
const NotFound = require('../error/NotFound');
const BadRequest = require('../error/BadRequest');
const Conflict = require('../error/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const { ValidationError } = mongoose.Error;

function findUserById(id) {
  return User.findById(id)
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    });
}

module.exports.getUser = (req, res, next) => {
  findUserById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userInfo = user.toObject();
      delete userInfo.password;
      res.send(userInfo);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Введеный email уже зарегистрирован'));
        return;
      }
      if (err.name instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join('; ');
        next(new BadRequest(errorMessage));
      } else next(err);
    });
};

module.exports.updateInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Введеный email уже зарегистрирован'));
        return;
      }
      if (err.name instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join('; ');
        next(new BadRequest(errorMessage));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      const userInfo = user.toObject();
      delete userInfo.password;
      res.send(req.cookies);
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Пользователь вышел из аккаунта' });
};
