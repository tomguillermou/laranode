/* eslint-disable array-callback-return */
const User = require('../models/User');

module.exports = {

  async readMany(req, res) {

    try {
      const users = await User.find().exec();

      res.send({ data: users });

    } catch (err) {
      res.status(500).send({ error: err });
    }
  },

  async readOne(req, res) {

    try {
      const user = await User.findById(req.params.id).exec();

      if (user === null) {
        throw new Error('This user does not exist');
      }

      res.send({ data: user });

    } catch (err) {
      res.status(500).send({ error: err });
    }
  },

  async updateOne(req, res) {

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
  },

  async deleteOne(req, res) {

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
};
