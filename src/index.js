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

function start(app) {
  mongoose.connect(`${config.dbAddress}/${config.dbName}`, {
    useNewUrlParser: true
  }, (err) => {
    if (err) {
      console.log('Error trying to connect to db: %s', config.dbName);
      console.log(err);
    } else {
      console.log('Connected to db: %s', config.dbName);
      app.listen(config.apiPort, () => {
        console.log('Listening port: %d', config.apiPort);
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

start(app);
