import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { profileSchema } from '../middleware/schemas.js';

const router = Router();

router.put('/profile', authenticate, validate(profileSchema), userController.updateProfile);
router.get('/admin/users', authenticate, requireAdmin, userController.getAllUsers);
router.delete('/admin/users/:id', authenticate, requireAdmin, userController.deleteUser);

export default router;
