import { api } from './api';
import { ApiResponse, User } from '../types';

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', {
    name,
    email,
    password,
  });
  return data.data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
    email,
    password,
  });
  return data.data;
}

export async function logout() {
  const { data } = await api.post<ApiResponse<null>>('/auth/logout');
  return data;
}

export async function getMe() {
  const { data } = await api.get<ApiResponse<{ user: User }>>('/auth/me');
  return data.data.user;
}
