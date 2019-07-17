import { Request, Response } from "express";

import User from '../models/User';


export async function readMany(req: Request, res: Response) {

  try {
    const users = await User.find().exec();

    res.send({ data: users });

  } catch (err) {
    res.status(500).send({ error: err });
  }
}

export async function readOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    res.send({ data: user });

  } catch (err) {
    res.status(500).send({ error: err });
  }
}

export async function updateOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    user.set(req.body);

    res.send({ data: user });

  } catch (err) {
    res.status(500).send({ error: err });
  }
}

export async function deleteOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    await user.remove();

    res.send({ data: user });

  } catch (err) {
    res.status(500).send({ error: err });
  }
}