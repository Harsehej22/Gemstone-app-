import { Router } from 'express';
import * as gemstoneController from '../controllers/gemstoneController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { gemstoneUpdateSchema } from '../middleware/schemas.js';

const router = Router();

router.get('/', authenticate, gemstoneController.getAll);
router.get('/:id', authenticate, gemstoneController.getById);
router.put('/:id', authenticate, requireAdmin, validate(gemstoneUpdateSchema), gemstoneController.update);

export default router;
