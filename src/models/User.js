const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const name = 'User';

const attributes = {
    email: {
        type: String,
        required: true,
        validate: {
            validator: async (value) => {
                const user = await mongoose.model('User')
                    .findOne()
                    .where('email').equals(value)
                    .exec();

                return (user === null);
            },
            message: 'This email is already used',
        },
    },
    password: {
        type: String,
        required: true,
    }
};

const options = {};

const schema = new mongoose.Schema(attributes, options);

// compare password with hash
schema.methods.comparePassword = function (plaintext) {
    return bcrypt.compareSync(plaintext, this.password);
};

// hash password before saving
schema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

module.exports = mongoose.model(name, schema);
