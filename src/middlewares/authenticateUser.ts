import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function authenticateUser(req: Request, res: Response, next: NextFunction) {

  try {
    const bearerToken = req.header("authorization");

    if (bearerToken === undefined) {
      throw new Error("Missing bearer token");
    }

    // Parse encoded JWT from Bearer token
    const encodedToken = bearerToken.split(" ")[1];

    // The encoded token corresponds to the user id trying to log in
    const decodedToken = jwt.verify(encodedToken, JWT_SECRET);

    // Check if decoded token is not a valid ObjectId
    if (typeof decodedToken !== "string" || !decodedToken.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bearer token");
    }

    const authUser = await User.findById(decodedToken).exec();

    if (authUser === null) {
      throw new Error("Authentication failed");
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
