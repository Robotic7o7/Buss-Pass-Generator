var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
var dotenv = require("dotenv");
var hot = require('hotlogjs');
var bodyParser = require('body-parser');

dotenv.config();

//mongoose
var mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(
    "mongodb+srv://robotic7o7:86j8yfu6c9@regstrationtest.0tfcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    mongooseOptions
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("mongodb connection established");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var busRoutesRouter = require('./routes/busRoutes');
var busStopsRouter = require('./routes/busStops');
var testRouter = require('./routes/test-route');
var qrgenRouter = require('./routes/qrgen');
var paymentsRouter = require('./routes/payments');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/bus-routes', busRoutesRouter);
app.use('/bus-stops', busStopsRouter);
app.use('/assign-route', testRouter);
app.use('/qrgen', qrgenRouter);
app.use('/payments', paymentsRouter);

module.exports = app;
