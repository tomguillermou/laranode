import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { handleErrorReponse } from "../core/errors";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function login(req: Request, res: Response) {

  try {
    const user = await User.findOne({ email: req.body.email }, "+password").exec();

    if (user === null || !user.comparePassword(req.body.password)) {
      throw new Error("Invalid credentials");
    }

    const tokenData = user._id.toString();
    const encodedToken = jwt.sign(tokenData, JWT_SECRET);

    res.json({ token: encodedToken });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}

export async function register(req: Request, res: Response) {

  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await user.save();

    const tokenData = savedUser._id.toString();
    const encodedToken = jwt.sign(tokenData, JWT_SECRET);

    res.json({ token: encodedToken });

  } catch (error) {
    handleErrorReponse(res, 500, error);
  }
}
