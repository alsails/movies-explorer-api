const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NotAuthenticated = require('../error/NotAuthenticated');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthenticated('Введена неверная почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthenticated('Введена неверная почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
