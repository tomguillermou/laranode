import { NextFunction, Request, Response } from "express";
import { isEmail, isLength, matches } from "validator";

import { check } from "../helpers";

export function login(req: Request, res: Response, next: NextFunction) {

  try {
    check(isEmail(req.body.email), "Email address must follow format \"jsmith@example.com\"");

    next();

  } catch (error) {
    console.error(error);
    res.status(422).json({ error });
  }
}

export function register(req: Request, res: Response, next: NextFunction) {

  try {
    check(isEmail(req.body.email), "Email address must follow format \"jsmith@example.com\"");

    check(isLength(req.body.password, { min: 8 }), "Password must have at least 8 characters");

    check(matches(req.body.password, /\d/), "Password must have at least 1 digit");

    check(matches(req.body.password, /[a-z]/), "Password must have at least 1 lowercase letter");

    check(matches(req.body.password, /[A-Z]/), "Password must have at least 1 uppercase letter");

    next();

  } catch (error) {
    console.error(error);
    res.status(422).json({ error: error.toString() });
  }
}
