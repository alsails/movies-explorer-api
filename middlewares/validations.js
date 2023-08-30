const { celebrate, Joi } = require('celebrate');
const {
  regexUrl,
  regexId,
  regexEmail,
  // russianRegex,
  // englishRegex,
} = require('../utils/regex');

module.exports.validationUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(regexEmail),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(regexEmail),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required(),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(regexId),
  }),
});
