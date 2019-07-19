/**
 * Module dependencies.
 */

import http from "http";
import mongoose from "mongoose";
import app from "./app";

/**
 * Get environment variables from .env file.
 */

const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const mongoDbDatabase = process.env.MONGODB_DATABASE || "laranode";

/**
 * Connect to MongoDB database.
 */

mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, { useNewUrlParser: true }, (err: any) => {
  if (err) {
    console.log(`Error trying to connect to db: ${mongoDbDatabase}`);
    console.log(err);
  } else {
    console.log(`Connected to db: ${mongoDbDatabase}`);
  }
});

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log(`Listening on port: ${port}`);
