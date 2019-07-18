import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


interface UserDocument extends mongoose.Document {
  email: string,
  password: string,
  comparePassword: (plaintext: string) => boolean
}


const name = 'User'


const attributes = {
  email: {
    type: String,
    required: true,
    validate: {
      validator: async (value: any) => {
        const existingUser = await mongoose.model('User').findOne()
          .where('email').equals(value)
          .exec();

        return existingUser === null;
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


const options = {};


const UserSchema = new mongoose.Schema(attributes, options);


UserSchema.methods.comparePassword = function (plaintext: string) {
  return bcrypt.compareSync(plaintext, this.password);
};


UserSchema.pre<UserDocument>('save', function (next: mongoose.HookNextFunction) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});


export default mongoose.model<UserDocument>(name, UserSchema);