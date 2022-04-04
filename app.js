const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const expressValidator = require('express-validator');
var connection = require('express-myconnection');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');
const app = express();
const indexRoutes = require('./routes/index');
const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');

const db = mysql.createConnection({
    host: 'bnwlvoe1cbgsxyhdyhcz-mysql.services.clever-cloud.com',
    user: 'uyqltb0vrjluuwcd', // your mysql user
    password: 'B9ecPQhCHU76l7RtceNo', // your mysql password
    database: 'bnwlvoe1cbgsxyhdyhcz' 
});

app.use(
    connection(mysql, {
        host: 'bnwlvoe1cbgsxyhdyhcz-mysql.services.clever-cloud.com',
        user: 'uyqltb0vrjluuwcd', // your mysql user
        password: 'B9ecPQhCHU76l7RtceNo', // your mysql password
        port: 3306, //port mysql
        database: 'bnwlvoe1cbgsxyhdyhcz' // your database name
    }, 'pool') //or single

);
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs');
app.set('view engine', 'jade'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(session({ secret: "secretpass123456" }));
app.use(flash());
app.use(fileUpload()); // configure fileupload
app.use(expressValidator())
    // routes for the app
app.use('/', indexRoutes);
app.use('/main', homeRoutes);
app.use('/player', playerRoutes);
app.get('*', function(req, res, next) {
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

const APP_PORT = process.env.port || '7383';
app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}...`);
  });