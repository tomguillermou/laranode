import { NextFunction, Request, Response } from "express";
import { isEmail, isLength, matches } from "validator";

import errorMessage from "../../config/errors/messages.json";
import { handleErrorReponse } from "../../core/errors";

export function login(req: Request, res: Response, next: NextFunction) {

  try {
    if (!isEmail(req.body.email)) {
      throw new Error(errorMessage.emailValidation.invalidFormat);
    }

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}

export function register(req: Request, res: Response, next: NextFunction) {

  try {
    if (!isEmail(req.body.email)) {
      throw new Error(errorMessage.emailValidation.invalidFormat);
    }

    if (!isLength(req.body.password, { min: 8 })) {
      throw new Error(errorMessage.passwordValidation.tooShort);
    }

    if (!matches(req.body.password, /\d/)) {
      throw new Error(errorMessage.passwordValidation.missingDigit);
    }

    if (!matches(req.body.password, /[a-z]/)) {
      throw new Error(errorMessage.passwordValidation.missingLowercaseLetter);
    }

    if (!matches(req.body.password, /[A-Z]/)) {
      throw new Error(errorMessage.passwordValidation.missingUppercaseLetter);
    }

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}
