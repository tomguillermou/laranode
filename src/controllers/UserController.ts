import { Request, Response } from "express";

import User from '../models/User';


export async function readMany(req: Request, res: Response) {

  try {
    const users = await User.find().exec();
    res.json({ data: users });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
console.log('titi');

export async function readOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    res.json({ data: user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}


export async function updateOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    user.set(req.body);
    await user.save();
    res.json({ update: 'done' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}


export async function deleteOne(req: Request, res: Response) {

  try {
    const user = await User.findById(req.params.id).exec();

    if (user === null) {
      throw new Error('This user does not exist');
    }

    await user.remove();
    res.json({ delete: 'done' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}