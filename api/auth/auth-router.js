const router = require('express').Router();
const User = require('../users/users-model');
const {
  checkPayload,
  checkUserInDb,
  checkUserExists
} = require('../middleware/middleware');

router.post(
  '/register',
  checkPayload,
  checkUserInDb,
  (req, res) => {}
);

router.post('/login', checkUserExists, (req, res) => {});

router.get('/logout', (req, res) => {});

module.exports = router;
