import fs from "fs";
import dotenv from "dotenv";

import errorMessage from "../config/errors/messages.json";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
  console.log("Environment variables loaded");
} else {
  dotenv.config({ path: ".env.example" });
  console.log("Environment variables loaded");
  console.log("Info: Copy file .env.example and rename it .env to specify your own environment variables");
}

if (!process.env.ENVIRONMENT) {
  console.log(errorMessage.missingEnvironmentVariable.ENVIRONMENT);
  process.exit(1);

} else if (!process.env.PORT) {
  console.log(errorMessage.missingEnvironmentVariable.PORT);
  process.exit(1);

} else if (!process.env.MONGODB_URI) {
  console.log(errorMessage.missingEnvironmentVariable.MONGODB_URI);
  process.exit(1);

} else if (!process.env.MONGODB_DATABASE) {
  console.log(errorMessage.missingEnvironmentVariable.MONGODB_DATABASE);
  process.exit(1);

} else if (!process.env.JWT_SECRET) {
  console.log(errorMessage.missingEnvironmentVariable.JWT_SECRET);
  process.exit(1);
}

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const PORT = process.env.PORT;

export const MONGODB_URI = process.env.MONGODB_URI;

export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

export const JWT_SECRET = process.env.JWT_SECRET;
