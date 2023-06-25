const router = require('express').Router();

const {
  getMovies,
  createMovie,
  delMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/me', validationCreateMovie, createMovie);
router.delete('/:movieId', delMovie);

module.exports = router;
