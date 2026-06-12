import mongoose, { Schema, Document } from 'mongoose';
import { Gender } from '../types/index.js';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  dateOfBirth?: Date;
  timeOfBirth?: string;
  placeOfBirth?: string;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    dateOfBirth: { type: Date },
    timeOfBirth: { type: String },
    placeOfBirth: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const obj = { ...ret };
    delete (obj as { password?: string }).password;
    return obj;
  },
});

export const User = mongoose.model<IUserDocument>('User', userSchema);
