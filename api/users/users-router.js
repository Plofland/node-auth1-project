// const express = require('express');
// const router = express.Router();
//this ⬆⬆ is the same as this ⬇⬇
const router = require('express').Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
