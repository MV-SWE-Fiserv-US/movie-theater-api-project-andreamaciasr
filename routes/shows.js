
const express = require('express');
const showsRouter = express.Router();
const { Show, User } = require('../models/index');


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

showsRouter.delete('/:id', async (req, res) => {
    try {
        const deletedShow = await Show.destroy({where: {id: req.params.id}})
        res.json({ message: `Deleted show with ID ${req.params.id}`, deletedShow });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

showsRouter.get("/genre/:genre", async (req, res) => {
    try {
        let genre = req.params.genre;
        let char = genre[0].toUpperCase();
        genre = char + genre.slice(1);
         
        console.log(`Searching for movies with genre: ${genre}`);
 
        const movies = await Show.findAll({ where: { genre } });
        if (movies.length > 0) {
            res.json(movies);
        } else {
            res.status(404).json({ message: "No movies found for this genre" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = showsRouter;


