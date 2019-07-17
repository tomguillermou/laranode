import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';

import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function login(req: Request, res: Response) {

  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (user && user.comparePassword(req.body.password)) {

      const tokenData = { userId: user._id };
      const token = sign(tokenData, JWT_SECRET);

      res.send({ token });

    } else {
      res.status(500).send({ error: 'Invalid credentials' });
    }

  } catch (err) {
    res.status(500).send({ error: err });
  }
}

export async function register(req: Request, res: Response) {

  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    const newUser = await user.save();
    const tokenData = { userId: newUser._id };
    const token = sign(tokenData, JWT_SECRET);

    res.status(200).json({ token });

  } catch (err) {
    res.status(500).send({ error: err });
  }
}
