const router = require('express').Router();

const {
  getUser,
  updateInfo,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', updateInfo);

module.exports = router;
