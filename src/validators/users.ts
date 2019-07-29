import { NextFunction, Request, Response } from "express";
import { isEmail, isLength, matches } from "validator";

import errorMessage from "../config/errors/messages.json";
import { handleErrorReponse } from "../core/errors";

export function readOne(req: Request, res: Response, next: NextFunction) {

  try {
    if (!matches(req.params.id, /^[0-9a-fA-F]{24}$/)) {
      throw new Error(errorMessage.invalidObjectIdFormat);
    }

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}

export function updateOne(req: Request, res: Response, next: NextFunction) {

  try {
    if (!matches(req.params.id, /^[0-9a-fA-F]{24}$/)) {
      throw new Error(errorMessage.invalidObjectIdFormat);
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

export function deleteOne(req: Request, res: Response, next: NextFunction) {

  try {
    if (!matches(req.params.id, /^[0-9a-fA-F]{24}$/)) {
      throw new Error(errorMessage.invalidObjectIdFormat);
    }

    next();

  } catch (error) {
    handleErrorReponse(res, error);
  }
}
