import express from 'express';
import mongoose from 'mongoose';

// Load .env file
import dotenv from 'dotenv';
dotenv.config();

// Middlewares
// import helmet from 'helmet';
// import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Router(s)
import apiRouter from './routes/api';


function start(app: any) {
  mongoose.connect(`${process.env.DATABASE_ADDRESS}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true
  }, (err: any) => {
    if (err) {
      console.log('Error trying to connect to db: %s', process.env.DATABASE_NAME);
      console.log(err);
    } else {
      console.log('Connected to db: %s', process.env.DATABASE_NAME);
      app.listen(process.env.PORT, () => {
        console.log('Listening port: %d', process.env.PORT);
      });
    }
  });
}

const app = express();

// Pre-request handler middlewares
app.use(morgan('dev'));
// app.use(helmet()); // Use Helmet to protect headers
// app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Router(s) binding
app.use('/api', apiRouter);

start(app);
