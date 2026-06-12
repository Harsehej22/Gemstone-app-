import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { recommendationSchema, searchSchema } from '../middleware/schemas.js';

const router = Router();

// Admin routes (must be before /:id)
router.get('/admin/all', authenticate, requireAdmin, recommendationController.getAllAdmin);
router.get('/admin/analytics', authenticate, requireAdmin, recommendationController.getAnalytics);

router.post('/', authenticate, validate(recommendationSchema), recommendationController.create);
router.get('/', authenticate, validate(searchSchema), recommendationController.getHistory);
router.get('/:id/export/json', authenticate, recommendationController.exportJson);
router.get('/:id/export/pdf', authenticate, recommendationController.exportPdf);
router.get('/:id', authenticate, recommendationController.getById);

export default router;
