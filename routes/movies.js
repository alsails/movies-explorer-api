const router = require('express').Router();

const {
  getMovies,
  createMovie,
  delMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/me', createMovie);
router.delete('/:movieId', delMovie);

module.exports = router;
