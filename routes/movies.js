const router = require('express').Router();

const {
  getMovies,
  createMovie,
  delMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationMovieId,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/me', validationCreateMovie, createMovie);
router.delete('/:movieId', validationMovieId, delMovie);

module.exports = router;
