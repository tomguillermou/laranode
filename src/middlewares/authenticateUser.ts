import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { handleErrorReponse } from "../core/errors";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function authenticateUser(req: Request, res: Response, next: NextFunction) {

  try {
    const authorizationHeader = req.header("authorization");

    if (authorizationHeader === undefined) {
      throw new Error("Missing the authorization header with the bearer token");
    }

    // Parse encoded bearer token from the authorization header
    const bearerToken = authorizationHeader.split(" ")[1];

    // The encoded token corresponds to the user id trying to log in
    const decodedToken = jwt.verify(bearerToken, JWT_SECRET);

    // Check if decoded token is not a valid ObjectId
    if (typeof decodedToken !== "string" || !decodedToken.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bearer token");
    }

    const authUser = await User.findById(decodedToken).exec();

    if (authUser === null) {
      throw new Error("Authentication failed");
    }

    req.authUserId = authUser._id.toString();

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}
