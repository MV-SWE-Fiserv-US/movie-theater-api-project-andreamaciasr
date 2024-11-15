const express = require('express');
const app = express();
const Show = require('../models/show');
const User = require('../models/user');
const db = require('../db/connection');
const usersRouter = require('../routes/users');


app.use(express.json());
app.use(express.urlencoded());
app.use('/users', usersRouter);


module.exports = app;