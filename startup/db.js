const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => { winston.info('Succesfully connected to MongoDB...') });
}