const router = require('express').Router();
const User = require('../users/users-model');
const bcrypt = require('bcryptjs');
const {
  checkPayload,
  checkUserInDb,
  checkUserExists
} = require('../middleware/middleware');

router.post(
  '/register',
  checkPayload,
  checkUserInDb,
  async (req, res) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.add({
        username: req.body.username,
        password: hash
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post('/login', checkUserExists, (req, res) => {
  try {
    const verified = bcrypt.compareSync(
      req.body.password,
      req.userData.password
    );
    if (verified) {
      req.session.user = req.userData;
      res.json(`Welcome back ${req.userData.username}`);
    } else {
      res
        .status(401)
        .json('Username or password are incorrect');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json('Cannot log out');
      } else {
        res.json('Successfully logged out');
      }
    });
  } else {
    res.json('No session');
  }
});

module.exports = router;
