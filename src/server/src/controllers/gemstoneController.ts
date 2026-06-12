import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/index.js';
import * as gemstoneService from '../services/gemstoneService.js';

export async function getAll(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const gemstones = await gemstoneService.getAllGemstones();

    res.json({
      success: true,
      data: { gemstones },
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const gemstone = await gemstoneService.getGemstoneById(req.params.id as string);

    res.json({
      success: true,
      data: { gemstone },
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const gemstone = await gemstoneService.updateGemstone(req.params.id as string, req.body);

    res.json({
      success: true,
      message: 'Gemstone updated successfully',
      data: { gemstone },
    });
  } catch (error) {
    next(error);
  }
}
