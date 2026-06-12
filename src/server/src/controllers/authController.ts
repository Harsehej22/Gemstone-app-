import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/index.js';
import * as authService from '../services/authService.js';

export async function register(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await authService.getUserById(req.user!.userId);

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: AuthRequest, res: Response) {
  // JWT is stateless; client removes token
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}
