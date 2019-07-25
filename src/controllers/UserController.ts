import { Request, Response } from "express";

import User from "../models/User";
import { handleErrorReponse } from "../core/errors";

export async function readMany(req: Request, res: Response) {

  try {
    const users = await User.find().exec();
    res.json({ data: users });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}

export async function readOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error("This user does not exist");
    }

    res.json({ data: user });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}

export async function updateOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error("This user does not exist");
    }

    user.set(req.body);
    await user.save();
    res.json({ update: "done" });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}

export async function deleteOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error("This user does not exist");
    }

    await user.remove();
    res.json({ delete: "done" });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}
