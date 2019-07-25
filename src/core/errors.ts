import { Response } from "express";

export function handleErrorReponse(res: Response, error: Error) {

  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  res.status(500).json({ message: error.message });
}
