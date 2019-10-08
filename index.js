const db = require("./config/database");
const meta = require("./config/meta");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require("morgan");

const app_port = process.env.PORT || 3001;

const expressSession = require("express-session");
// This middleware will destroy any modified session cookies
const validateSession = require("./config/validateSession");

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

app.use(cookieParser("some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(session);
app.use(validateSession);

// ---- ROUTES ----
// User State API Call
app.use(require("./routes/api/user/state"));
app.use(require("./routes/api/user/login"));


// Default paths
const index = fs.readFileSync(path.join(__dirname + '/client/build/index.html'));
const handleIndex = async (req, res) => {
  res.send(await meta.fillIndex(index.toString(), req.path));
};

// Early catch so index isn't handled statically
app.route("/").get(handleIndex);

// Static Build Files
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all return filled index
app.route("*").get(handleIndex);

server.listen(app_port, () => {
  console.log('listening on *:' + app_port);
});
