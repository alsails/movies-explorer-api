const router = require('express').Router();

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validations');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);
router.post('/signout', logout);

module.exports = router;
