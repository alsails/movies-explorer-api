const mongoose = require('mongoose');

const Movie = require('../models/movies');
const NotFound = require('../error/NotFound');
const Forbidden = require('../error/Forbidden');
const BadRequest = require('../error/BadRequest');

const { CastError, ValidationError } = mongoose.Error;

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .populate(['owner'])
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      movie.populate(['owner'])
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        const errorMessage = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new BadRequest(errorMessage));
      } else next(err);
    });
};

module.exports.delMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найдена');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new Forbidden('Невозможно удалить чужой фильм'));
      } else {
        movie.deleteOne()
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequest('Введен некорректный _id'));
      } else next(err);
    });
};
