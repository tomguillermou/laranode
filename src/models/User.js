const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Name
 */
const name = 'User';

/**
 * Attributes
 */
const attributes = {
  email: {
    type: String,
    required: true,
    validate: {
      validator: async (value) => {
        const user = await mongoose.model('User').findOne()
          .where('email').equals(value)
          .exec();

        const emailAlreadyUsed = user === null;

        return emailAlreadyUsed;
      },
      message: 'This email is already used',
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  }
};

/**
 * Options
 */
const options = {};

/**
 * Schema
 */
const schema = new mongoose.Schema(attributes, options);

/**
 * Methods
 */
schema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

/**
 * Hooks
 */
schema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

/**
 * Model export
 */
module.exports = mongoose.model(name, schema);
