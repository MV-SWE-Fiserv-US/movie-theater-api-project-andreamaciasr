const express = require('express');
const usersRouter = express.Router();
const { User, Show }   = require('../models/index');


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


usersRouter.put('/:userId/shows/:showId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, { include: [Show] });
        const show = await Show.findByPk(req.params.showId);

        if (!user || !show) {
            return res.status(404).json({ message: "User or Show not found" });
        }

        await user.addShow(show);
        res.json(user.shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = usersRouter;