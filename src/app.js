const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const config = require('./config.json');

// Router(s)
const apiRouter = require('./routes/api');

function start() {
    mongoose.connect(`${config.dbAddress}/${config.dbName}`, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log('Error trying to connect to database: %s', config.dbName);
            console.log(err);
        } else {
            console.log('Connected to database: %s', config.dbName);
            app.listen(config.apiPort, () => {
                console.log('App started on port: %d', config.apiPort);
            });
        }
    });
}

const app = express();

// Middlewares binding
app.use(morgan('dev'));
app.use(helmet()); // Use Helmet to protect headers
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Router(s) binding
app.use(config.apiPath, apiRouter);

start();
