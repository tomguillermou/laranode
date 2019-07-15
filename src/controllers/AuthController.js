const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {

  async login(req, res) {

    try {
      const user = await User.findOne({ email: req.body.email }).exec();

      if (user && user.comparePassword(req.body.password)) {

        const tokenData = { userId: user._id };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET);

        res.send({ token });

      } else {
        res.status(500).send({ error: 'Invalid credentials' });
      }

    } catch (err) {
      res.status(500).send({ error: err });
    }
  },

  async register(req, res) {

    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password
      });

      const newUser = await user.save();

      const tokenData = { userId: newUser._id };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET);

      res.status(200).json({ token });

    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};
