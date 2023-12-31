const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie.js');
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort();
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save();
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.find({_id: req.params.id});
    if(!movie) res.status(404).send("Movie not found")
    res.send(movie)
})

router.put('/:id', auth, async (req, res) => {

    const { error } = validate(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if(!movie) res.status(404).send("Movie not found")

    res.send(movie);
})

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.deleteOne({_id: req.params.id});

    if(!movie) res.status(404).send('The movie with the given ID was not found')
    
    res.send(movie); 
});

module.exports = router;