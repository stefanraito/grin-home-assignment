import { Router } from 'express';
import { satisfactionController } from '../controllers/satisfaction.controller';

const router = Router();
router.get('/', satisfactionController);

export default router;