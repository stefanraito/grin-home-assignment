import { Router } from 'express';
import { patientsController } from '../controllers/patients.controller';

const router = Router();
router.get('/', patientsController);

export default router;