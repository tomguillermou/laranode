import { Request, Response, NextFunction } from "express";
import { verify, VerifyErrors } from 'jsonwebtoken';
import User from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export default function authenticateUser(req: Request, res: Response, next: NextFunction) {

  // Parse JWT from Bearer token in header
  const bearerToken = req.header('authorization');

  if (bearerToken) {
    const tokenArray = bearerToken.split(' ');
    const token = tokenArray[1];

    verify(token, JWT_SECRET, (err: VerifyErrors, decodedToken: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: err })
      }

      User.findById(decodedToken.userId, (err, user) => {
        if (err) { return res.status(500).send({ error: err }) }

        if (user === null) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
      })

      next();
    });

  } else {
    res.status(500).send({ error: 'Missing authorization header' });
  }
};
