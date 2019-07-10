const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {

    login: async (req, res) => {

        const { email } = req.body;
        const { password } = req.body;

        try {
            const user = await User.findOne().where('email').equals(email).exec();

            if (user && user.comparePassword(password)) {

                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

                res.status(200).json({ token });
                
            } else {
                res.status(500).json({ error: 'Invalid credentials' });
            }

        } catch (error) {
            res.status(500).json({ error });
        }
    },

    register: async (req, res) => {

        try {
            const docUser = {
                email: req.body.email,
                password: req.body.password
            };

            const user = await User.create(docUser);

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.status(200).json({ token });

        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
