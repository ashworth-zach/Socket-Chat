var express = require('express');
var mongoose = require('mongoose');
var app = express();
const session = require('express-session');
const flash = require('express-flash');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Static'));

app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))


// Retrieve the Schema called 'User' and store it to the variable User


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8000, function () {
    console.log("listening on port 8000");
})