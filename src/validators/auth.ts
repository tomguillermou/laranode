import { NextFunction, Request, Response } from "express";
import validator from "validator";

export function login(req: Request, res: Response, next: NextFunction) {

  try {
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Email address must follow format \"jsmith@example.com\"");
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(422).json({ error });
  }
}

export function register(req: Request, res: Response, next: NextFunction) {

  try {
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Email address must follow format 'jsmith@example.com'");
    }

    if (!validator.isLength(req.body.password, { min: 8 })) {
      throw new Error("Password must have at least 8 characters");
    }

    if (!validator.matches(req.body.password, /\d/)) {
      throw new Error("Password must have at least 1 digit");
    }

    if (!validator.matches(req.body.password, /[a-z]/)) {
      throw new Error("Password must have at least 1 lowercase letter");
    }

    if (!validator.matches(req.body.password, /[A-Z]/)) {
      throw new Error("Password must have at least 1 uppercase letter");
    }

    next();

  } catch (error) {
    console.error(error);
    res.status(422).json({ error: error.toString() });
  }
}
