const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

// Router(s)
const apiRouter = require('./routes/api');

function start(app) {
  mongoose.connect(`${process.env.DATABASE_ADDRESS}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to db: %s', process.env.DATABASE_NAME);
    })
    .catch((err) => {
      console.log('Error trying to connect to db: %s', process.env.DATABASE_NAME);
      console.log(err);
      process.exit(1);
    });

  app.listen(process.env.PORT, () => {
    console.log('Listening port: %d', process.env.PORT);
  });
}

const app = express();

// Middlewares binding
app.use(morgan('dev'));
app.use(helmet()); // Use Helmet to protect headers
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Router(s) binding
app.use('/api', apiRouter);

start(app);
