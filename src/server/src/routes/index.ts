import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import gemstoneRoutes from './gemstoneRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/gemstones', gemstoneRoutes);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Gemstone API is running' });
});

export default router;
