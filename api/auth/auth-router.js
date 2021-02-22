const router = require('express').Router();
const User = require('../users/users-model')
const {checkPayload,
  checkUserInDb,
  checkUserExists} = require('../middleware/middleware')


router.post('/register', (req, res) => {
  
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})

module.exports = server;