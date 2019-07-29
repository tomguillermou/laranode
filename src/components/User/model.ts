import bcrypt from "bcrypt";
import mongoose from "mongoose";

type UserDocument = mongoose.Document & {
  email: string;
  username: string;
  password: string;
  comparePassword: (plaintext: string) => boolean;
};

const attributes = {
  email: {
    required: true,
    type: String,
    unique: true,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    select: false,
    type: String,
  },
};

const options = {};

const UserSchema = new mongoose.Schema(attributes, options);

UserSchema.methods.comparePassword = function (plaintext: string) {
  return bcrypt.compareSync(plaintext, this.password);
};

// Hash password
UserSchema.pre<UserDocument>("save", function (next: mongoose.HookNextFunction) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
