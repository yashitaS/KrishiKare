import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: number;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number, // You could also use String if you want to preserve leading zeros
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Optional: automatically adds `createdAt` and `updatedAt`
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
