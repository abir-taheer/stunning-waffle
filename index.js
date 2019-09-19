const db = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require("morgan");

const app_port = process.env.PORT || 5055;

app.use(cookieParser("some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const expressSession = require("express-session");

const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: (30 * 86400 * 1000),
  createDatabaseTable: true,
}, db.pool);

const session = expressSession({
  secret: "some_semi_permanent_not_so_secret_secret",
  name: "session",
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: (30 * 86400 * 1000)
  }
});

// ROUTES

server.listen(app_port, () => {
  console.log('listening on *:' + app_port);
});
