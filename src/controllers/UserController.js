const User = require('../models/User');

module.exports = {

    readMany: async (req, res) => {

        try {
            const users = await User.find().select('-password').exec();

            res.status(200).json({ users });

        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
