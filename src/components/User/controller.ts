import { Request, Response } from "express";

import User from "./model";

import { handleErrorReponse } from "../../core/errors";
import errorMessage from "../../config/errors/messages.json";

export async function readMany(req: Request, res: Response) {

  try {
    const users = await User.find().exec();
    res.json({ data: users });

  } catch (error) {
    handleErrorReponse(res, error);
  }
}

export async function readOne(req: Request, res: Response) {

  try {
    const user = await User.findOne({ username: req.params.username }).exec();

    if (user === null) {
      throw new Error(errorMessage.userDoesNotExist);
    }

    res.json({ data: user });

  } catch (error) {
    handleErrorReponse(res, error);
  }
}

export async function updateOne(req: Request, res: Response) {

  try {
    const user = await User.findOne({ username: req.params.username }).exec();

    if (user === null) {
      throw new Error(errorMessage.userDoesNotExist);
    }

    user.set(req.body);
    await user.save();
    res.json({ update: "done" });

  } catch (error) {
    handleErrorReponse(res, error);
  }
}

export async function deleteOne(req: Request, res: Response) {

  try {
    const user = await User.findOne({ username: req.params.username }).exec();

    if (user === null) {
      throw new Error(errorMessage.userDoesNotExist);
    }

    await user.remove();
    res.json({ delete: "done" });

  } catch (error) {
    handleErrorReponse(res, error);
  }
}
