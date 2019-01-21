var express = require('express');
var mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
var app = express();
const server = app.listen(3000);
var io = require('socket.io')(server);
mongoose.connect('mongodb://localhost/NodeChat');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

var path = require('path');

app.use(flash());
app.use(express.static(path.join(__dirname, './Static')));

app.set('views', path.join(__dirname, './Views'));

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
mongoose.Promise = global.Promise;
var User = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'name must be longer than 3 characters'],
        maxlength: [100, 'name cannot be over 100 characters'],
        required: [true, 'name cannot be empty'],
    },
}, {
        timestamps: true
    })
var Message = new mongoose.Schema({
    message: {
        type: String,
        minlength: [1, 'message must be longer than 1 characters'],
        maxlength: [100, 'message cannot be over 100 characters'],
        required: [true, 'message cannot be empty'],
    },
    user:{
        type:String
    },
}, {
        timestamps: true
    })

mongoose.model('User', User);
mongoose.model('Message', Message);

// Retrieve the Schema called 'User' and store it to the variable User

var User = mongoose.model('User');
var Message = mongoose.model('Message');
app.get('/', function (req, res) {
    var login = true;
    if (req.session.UserId == null) {
        login = false
        res.render("index", { login: login });

    }
    else {
        User.findOne({ _id: req.session.UserId }, function (err, user) {
            res.render("index", { login: login, UserId: req.session.UserId, Username: user.name });
        })
    }
});
app.post('/register', function (req, res) {
    var usertocreate = new User(req.body);
    User.create(usertocreate, function (err, user) {
        if (err) {
            for (var key in err.errors) {
                req.flash('error', err.errors[key].message);
            }
            res.redirect("/")
        }
        else {
            req.session.UserId = user._id;
            res.redirect('/');
        }
    })
});
app.post('/update', function (req, res) {
    User.findOne({ _id: req.session.UserId }, function (err, user) {
        if (err) {
            for (var key in err.errors) {
                req.flash('error', err.errors[key].message);
            }
            res.redirect("/")
        }
        else {
            user.name = req.body.name;
            user.save();
            res.redirect("/")
        }
    })
});

// const server = app.listen(1337);
io.on('connection', function (socket) {

    socket.on('newmessage', function (data) {
        console.log(data.message);
        newMessage = new Message({message:data.message,user:data.user});
        Message.create(newMessage, function (err, msg) {
            if (err) {
            return;

            }
            else{
                socket.broadcast.emit("message",{message:msg.message,user:msg.user});
            }
        })
    });
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})

