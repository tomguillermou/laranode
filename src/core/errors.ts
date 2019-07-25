import { Response } from "express";

export function handleErrorReponse(res: Response, status: number, error: Error) {

  // Parse Error object to JSON object with infos
  const errorJson = {
    name: error.name,
    message: error.message
  };

  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  res.status(status).json(errorJson);
}
