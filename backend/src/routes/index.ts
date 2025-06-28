import { Router } from 'express';
import statsRoutes from './stats.routes';
import patientsRoutes from './patients.routes';
import satisfactionRoutes from './satisfaction.routes';

const api = Router();
api.use('/stats', statsRoutes);
api.use('/patients', patientsRoutes);
api.use('/satisfaction', satisfactionRoutes);

export default api;