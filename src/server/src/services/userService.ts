import { User } from '../models/User.js';
import { AppError } from '../utils/errors.js';
import { Gender } from '../types/index.js';

interface ProfileUpdateData {
  name?: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: Gender;
}

export async function updateProfile(userId: string, data: ProfileUpdateData) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      ...(data.name && { name: data.name }),
      dateOfBirth: new Date(data.dateOfBirth),
      timeOfBirth: data.timeOfBirth,
      placeOfBirth: data.placeOfBirth,
      gender: data.gender,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}

export async function getAllUsers() {
  return User.find().select('-password').sort({ createdAt: -1 });
}

export async function deleteUser(userId: string, requesterId: string) {
  if (userId === requesterId) {
    throw new AppError('Cannot delete your own account', 400);
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}
