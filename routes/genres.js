const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre.js');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort();
    res.send(genres);

});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);

    if(error) {
        return res.status(400).send('Name is required and should be minimum 3 characters');
    }

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save();
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.find({_id: req.params.id});
    if(!genre) res.status(404).send("genre not found")
    res.send(genre)
})

router.put('/:id', auth, async (req, res) => {

    const { error } = validate(req.body);

    if(error) {
        return res.status(400).send('Name is required and should be minimum 3 characters');
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if(!genre) res.status(404).send("Genre not found");

    res.send(genre);
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.deleteOne({_id: req.params.id});

    if(!genre) res.status(404).send('The genre with the given ID was not found');
    
    res.send(genre); 
});

module.exports = router;