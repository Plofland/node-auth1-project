const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(
  session
);

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

const config = {
  name: 'sessionId',
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //whether we're using https or not
    httpOnly: true //can't use javascript to read the cookies
  },
  resave: false,
  saveUninitialized: false, //anytime we login, it renews the session

  store: new KnexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(session(config));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up & running' });
});

module.exports = server;
