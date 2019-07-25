import { NextFunction, Request, Response } from "express";
import { isEmail, isLength, matches } from "validator";

import { handleErrorReponse } from "../core/errors";

import errorMessage from "../config/errors/messages.json";

export function login(req: Request, res: Response, next: NextFunction) {

  try {
    if (isEmail(req.body.email)) { throw new Error(errorMessage.invalidEmailFormat); }

    next();

  } catch (error) {
    handleErrorReponse(res, 422, error);
  }
}

export function register(req: Request, res: Response, next: NextFunction) {

  try {
    if (isEmail(req.body.email)) { throw new Error(errorMessage.invalidEmailFormat); }

    if (isLength(req.body.password, { min: 8 })) { throw new Error(errorMessage.passwordTooShort); }

    if (matches(req.body.password, /\d/)) { throw new Error(errorMessage.passwordMissingDigit); }

    if (matches(req.body.password, /[a-z]/)) { throw new Error(errorMessage.passwordMissingLowercase); }

    if (matches(req.body.password, /[A-Z]/)) { throw new Error(errorMessage.passwordMissingUppercase); }

    next();

  } catch (error) {
    handleErrorReponse(res, 422, error);
  }
}
