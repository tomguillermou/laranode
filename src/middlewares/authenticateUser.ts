import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../components/User/model";

import { handleErrorReponse } from "../core/errors";
import errorMessage from "../config/errors/messages.json";

import { JWT_SECRET } from "../utils/secrets";

export default async function authenticateUser(req: Request, res: Response, next: NextFunction) {

  try {
    const authorizationHeader = req.header("authorization");

    if (authorizationHeader === undefined) {
      throw new Error(errorMessage.missingAuthorizationHeader);
    }

    // Parse encoded bearer token from the authorization header
    const bearerToken = authorizationHeader.split(" ")[1];

    // The encoded token corresponds to the user id trying to log in
    const decodedToken = jwt.verify(bearerToken, JWT_SECRET as string);

    // Check if decoded token is not a valid ObjectId
    if (typeof decodedToken !== "string" || !decodedToken.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error(errorMessage.invalidBearerToken);
    }

    const authUser = await User.findById(decodedToken).exec();

    if (authUser === null) {
      throw new Error(errorMessage.authenticationFailed);
    }

    req.authUserId = authUser._id.toString();

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}
