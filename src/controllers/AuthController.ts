import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export async function login(req: Request, res: Response) {

  try {
    const user = await User.findOne({ email: req.body.email }, '+password').exec();

    if (user === null || !user.comparePassword(req.body.password)) {
      throw new Error('Invalid credentials');
    }

    const tokenData = user._id;
    const encodedToken = jwt.sign(tokenData, JWT_SECRET);

    res.json({ token: encodedToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}


export async function register(req: Request, res: Response) {

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();

    const tokenData = savedUser._id;
    const encodedToken = jwt.sign(tokenData, JWT_SECRET);

    res.json({ token: encodedToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
