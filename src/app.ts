import express from 'express';
import morgan from 'morgan';
// import helmet from 'helmet';
// import cors from 'cors';
import bodyParser from 'body-parser';


import apiRouter from './routes/api';


const app = express();


app.use(morgan('dev'));
// app.use(helmet()); // Use Helmet to protect headers
// app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());


app.use('/api', apiRouter);


export default app;
