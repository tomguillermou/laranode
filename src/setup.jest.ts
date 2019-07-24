require("dotenv").config();

const mongoose = require("mongoose");

const mongoDbUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const mongoDbDatabase = process.env.MONGODB_DATABASE || "laranode";

beforeEach(async done => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
      });
    } catch (error) {
      console.log("error opening db:", error);
    }
  }
  return done();
});

afterEach(async done => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log("error closing db:", error);
  }
  return done();
});
