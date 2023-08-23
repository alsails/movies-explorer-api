const router = require('express').Router();

const {
  getUser,
  updateInfo,
} = require('../controllers/users');

const {
  validationUpdateUserInfo,
} = require('../middlewares/validations');

router.get('/me', getUser);
router.patch('/me', validationUpdateUserInfo, updateInfo);

module.exports = router;
