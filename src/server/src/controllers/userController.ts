import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/index.js';
import * as userService from '../services/userService.js';

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await userService.updateProfile(req.user!.userId, req.body);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();

    res.json({
      success: true,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await userService.deleteUser(req.params.id as string, req.user!.userId);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
