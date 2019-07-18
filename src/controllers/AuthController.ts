import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export function login(req: Request, res: Response) {

  User.findOne({ email: req.body.email }, '+password', (err, user) => {
    if (err) { return res.status(500).send({ error: err }) }

    if (user === null || !user.comparePassword(req.body.password)) {
      return res.status(500).send({ error: 'Invalid credentials' });
    }

    const tokenData = { userId: user._id };

    jwt.sign(tokenData, JWT_SECRET, (err, encodedToken) => {
      if (err) { return res.status(500).send({ error: err }) }

      res.status(200).json({ token: encodedToken });
    });
  });
}


export function register(req: Request, res: Response) {

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save((err, savedUser) => {
    if (err) { return res.status(500).send({ error: err }) }

    const tokenData = { userId: savedUser._id };

    jwt.sign(tokenData, JWT_SECRET, (err, encodedToken) => {
      if (err) { return res.status(500).send({ error: err }) }

      res.status(200).json({ token: encodedToken });
    });
  });
}
