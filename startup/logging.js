require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

winston.add(new winston.transports.File({filename: 'combined.log', level: 'info'}));
winston.add(new winston.transports.MongoDB({db: 'mongodb://127.0.0.1/vidly', level: 'info'}));
winston.add(new winston.transports.Console());


module.exports = function() {
    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        process.exit(1);
    } );
    
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}