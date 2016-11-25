let express = require('express');
let app = express();
let config = require('config');
let path = require('path');
let bodyParser = require('body-parser');
let compression = require('compression');
let session = require('express-session');
let passport = require('passport');
let pug = require('pug');

//controllers----------------------------------------------------
// let home = require('./app/frontend/home/controller');

//helpers--------------------------------------------------------
// let directoriesHelper = require('./helpers/directories');

global.appRoot = path.resolve(__dirname);

app.use(compression());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//passport
app.use(session({
    secret: "silenceisgold",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public', {maxAge: parseInt(config.route.maxAge*1000)}));

//pug
app.set('view engine', 'pug');

//dashboard router
app.use('/dashboard', require('./app/dashboard/router'));

//run server
app.listen(config.get('serverPort'), function () {
    console.log('Web Server listening on port ' + config.get('serverPort') + '!');
});

module.exports = app;