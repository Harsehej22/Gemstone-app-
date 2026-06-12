import { api } from './api';
import { ApiResponse, User, Gender } from '../types';

export async function updateProfile(profile: {
  name?: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: Gender;
}) {
  const { data } = await api.put<ApiResponse<{ user: User }>>('/users/profile', profile);
  return data.data.user;
}

export async function getAllUsers() {
  const { data } = await api.get<ApiResponse<{ users: User[] }>>('/users/admin/users');
  return data.data.users;
}

export async function deleteUser(id: string) {
  const { data } = await api.delete<ApiResponse<null>>(`/users/admin/users/${id}`);
  return data;
}
