import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/index.js';
import * as recommendationService from '../services/recommendationService.js';
import * as authService from '../services/authService.js';
import { generateRecommendationPDF } from '../services/pdfService.js';
import { IGemstoneDocument } from '../models/Gemstone.js';

export async function create(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const recommendation = await recommendationService.createRecommendation(
      req.user!.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: 'Recommendation generated successfully',
      data: { recommendation },
    });
  } catch (error) {
    next(error);
  }
}

export async function getHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { q, page = '1', limit = '10' } = req.query;
    const result = await recommendationService.getUserRecommendations(
      req.user!.userId,
      q as string | undefined,
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const recommendation = await recommendationService.getRecommendationById(
      req.params.id as string,
      req.user!.userId
    );

    res.json({
      success: true,
      data: { recommendation },
    });
  } catch (error) {
    next(error);
  }
}

export async function exportJson(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const recommendation = await recommendationService.getRecommendationById(
      req.params.id as string,
      req.user!.userId
    );

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="recommendation-${req.params.id}.json"`
    );
    res.json(recommendation);
  } catch (error) {
    next(error);
  }
}

export async function exportPdf(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const recommendation = await recommendationService.getRecommendationById(
      req.params.id as string,
      req.user!.userId
    );
    const user = await authService.getUserById(req.user!.userId);
    const gemstone = recommendation.gemstoneId as unknown as IGemstoneDocument;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="recommendation-${req.params.id}.pdf"`
    );

    const doc = generateRecommendationPDF(recommendation, gemstone, user.name);
    doc.pipe(res);
  } catch (error) {
    next(error);
  }
}

export async function getAllAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page = '1', limit = '20' } = req.query;
    const result = await recommendationService.getAllRecommendations(
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAnalytics(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const analytics = await recommendationService.getAnalytics();

    res.json({
      success: true,
      data: { analytics },
    });
  } catch (error) {
    next(error);
  }
}
