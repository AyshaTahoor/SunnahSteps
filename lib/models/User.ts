import { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'scholar';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'scholar'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model<IUser>('User', UserSchema);
