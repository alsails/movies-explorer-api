const { celebrate, Joi } = require('celebrate');
const {
  regexUrl,
  regexId,
  russianRegex,
  englishRegex,
} = require('../utils/regex');

module.exports.validationUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
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
    email: Joi.string().email().required(),
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
    nameRU: Joi.string().required().regex(russianRegex),
    nameEN: Joi.string().required().regex(englishRegex),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required().regex(regexId),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(regexId),
  }),
});
