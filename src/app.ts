import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "./routes/api";

const app = express();

app.use(morgan("dev"));
app.use(helmet()); // Use Helmet to protect headers
app.use(bodyParser.json());

app.use(apiRouter);

export default app;
