// extn.js

// Setup Info =================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var favicon = require('serve-favicon');
const expressStatusMonitor = require('express-status-monitor');




// File Configuration =======================

var path = require('path');
app.set('views', path.join(__dirname, '/www'));
app.use(express.static(path.join(__dirname, '/')));

// Status Monitor =======================

app.use(expressStatusMonitor());


app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/favicon.ico'));

// Database Configuration ================

var extnDB = require('./config/database/extnsionDB.js');
mongoose.connect(extnDB.url);


// Passport Configuration =================
require('./config/passport/passport')(passport);


// CallBack Configuration =================


app.use(session({
    secret: 'aMaZing44heRcULeS34upstAIRS31brOo54vIgILantISm', // session secret - Will change before going live so don't try copying it!
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// Express Configuration =========================

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// HTTPS CERTS ====================

const options = {
    cert: fs.readFileSync('./config/certs/extnsion_co_uk.crt'),
    key: fs.readFileSync('./config/certs/extnsion.co.uk.key')
};

// Routes =======================

require('./config/routes/routes.js')(app, passport);

// HTTP & HTTPS Access ==========================

var server = require('https');
server.createServer(options, app).listen(443);


