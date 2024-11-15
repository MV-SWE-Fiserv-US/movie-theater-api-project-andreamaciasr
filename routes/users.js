const express = require('express');
const usersRouter = express.Router();
const { User, Show }   = require('../models/index');
const { check, validationResult } = require("express-validator");
const { where } = require('sequelize');

usersRouter.use(express.json());
usersRouter.use(express.urlencoded());


usersRouter.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

usersRouter.get('/:id/shows', async (req, res) => {
    const id = req.params.id;
    let result = await User.findByPk(id, { include: [Show]});
    res.send(result.shows).json();
});
// usersRouter.put('/users/:id/shows/:id', async (req, res) => {



module.exports = usersRouter;