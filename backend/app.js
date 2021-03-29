var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
var dotenv = require("dotenv");

dotenv.config();

//mongoose
var mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(
    "mongodb+srv://robotic707:hellorohan@cluster0.mjrzp.mongodb.net/BussPassData?retryWrites=true&w=majority",
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

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/bus-routes', busRoutesRouter);
app.use('/bus-stops', busStopsRouter);

module.exports = app;
