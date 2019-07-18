import { Request, Response } from "express";

import User from '../models/User';


export function readMany(req: Request, res: Response) {

  User.find((err, users) => {
    if (err) { return res.status(500).send({ error: err }) }

    res.send({ data: users });
  });
}

export function readOne(req: Request, res: Response) {

  User.findById(req.params.id, (err, user) => {
    if (err) { return res.status(500).send({ error: err }) }

    if (user === null) {
      return res.status(500).send({ error: 'This user does not exist' })
    }

    res.send({ data: user });
  });
}

export async function updateOne(req: Request, res: Response) {

  User.findById(req.params.id, (err, user) => {
    if (err) { return res.status(500).send({ error: err }) }

    if (user === null) {
      return res.status(500).send({ error: 'This user does not exist' })
    }

    user.set(req.body);

    user.save((err, user) => {
      if (err) { return res.status(500).send({ error: err }) }

      res.send({ data: user });
    });
  });
}

export async function deleteOne(req: Request, res: Response) {

  User.findById(req.params.id, (err, user) => {
    if (err) { return res.status(500).send({ error: err }) }

    if (user === null) {
      return res.status(500).send({ error: 'This user does not exist' })
    }

    user.remove((err, user) => {
      console.log(err);
      if (err) { return res.status(500).send({ error: err }) }

      res.send({ data: user });
    });
  });
}