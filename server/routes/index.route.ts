import * as express from 'express';
// const userRoutes = require('./user.route');
// const authRoutes = require('./auth.route');

import userRoutes from './user.route';
import authRoutes from './auth.route';
import duelRoutes from './duel.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/duel', duelRoutes);

export default router;
