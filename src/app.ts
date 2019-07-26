import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_DATABASE } from "./boot/env";

import apiRouter from "./routes/api";

const app = express();

/**
 * Connect to MongoDB database.
 */
mongoose.connect(`${MONGODB_URI}/${MONGODB_DATABASE}`, { useNewUrlParser: true }, (err: any) => {
  if (err) {
    console.log(`Error trying to connect to db: ${MONGODB_DATABASE}`);
    console.log(err);
  } else {
    console.log(`Connected to db: ${MONGODB_DATABASE}`);
  }
});

app.use(morgan("dev"));
app.use(helmet()); // Use Helmet to protect headers
app.use(bodyParser.json());

app.use(apiRouter);

export default app;
