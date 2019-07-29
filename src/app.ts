import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_DATABASE } from "./utils/secrets";

import authRouter from "./components/Auth/routes";
import userRouter from "./components/User/routes";

const app = express();

async function connect() {
  try {
    await mongoose.connect(`${MONGODB_URI}/${MONGODB_DATABASE}`, { useNewUrlParser: true });
    console.log(`Connected to db: ${MONGODB_DATABASE}`);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connect();

// app.use(morgan("dev"));
app.use(helmet()); // Use Helmet to protect headers
app.use(bodyParser.json());

app.use(authRouter);
app.use(userRouter);

export default app;
