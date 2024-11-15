
const express = require('express');
const showsRouter = express.Router();
const { Show, User } = require('../models/index');
const { check, validationResult } = require("express-validator");

showsRouter.use(express.json());
showsRouter.use(express.urlencoded());

showsRouter.get('/', async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

showsRouter.get('/:id', async (req, res) => {       
    try {
        const show = await Show.findByPk(req.params.id);
        res.json(show);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

showsRouter.get('/:id/users', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id, {
            include: [User]
        });
        res.json(show.users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

showsRouter.put('/:showId/available', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.showId);
        show.available = !show.available;
        await show.save();
        res.json(show.available);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = showsRouter;


