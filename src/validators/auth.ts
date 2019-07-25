import { NextFunction, Request, Response } from "express";
import { isEmail, isLength, matches } from "validator";

import { handleErrorReponse } from "../core/errors";
import { check } from "../utils/helpers/validators";

import errorMessage from "../config/errors/messages.json";

export function login(req: Request, res: Response, next: NextFunction) {

  try {
    check(isEmail(req.body.email), errorMessage.invalidEmailFormat);

    next();

  } catch (error) {
    handleErrorReponse(res, 422, error);
  }
}

export function register(req: Request, res: Response, next: NextFunction) {

  try {
    check(isEmail(req.body.email), errorMessage.invalidEmailFormat);

    check(isLength(req.body.password, { min: 8 }), errorMessage.passwordTooShort);

    check(matches(req.body.password, /\d/), errorMessage.passwordMissingDigit);

    check(matches(req.body.password, /[a-z]/), errorMessage.passwordMissingLowercase);

    check(matches(req.body.password, /[A-Z]/), errorMessage.passwordMissingUppercase);

    next();

  } catch (error) {
    handleErrorReponse(res, 422, error);
  }
}
