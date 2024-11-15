const express = require('express');
const usersRouter = express.Router();
const { User, Show }   = require('../models/index');
const { check, validationResult } = require("express-validator");




module.exports = usersRouter;