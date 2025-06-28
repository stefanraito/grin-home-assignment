import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes/index';
import { datasetRepository } from './repositories/dataset.repository';
import { registerErrorHandlers } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', apiRoutes);

app.get('/health', (_req, res) => res.send('OK'));

// dataset loading once at startup.
(async () => {
  try {
    await datasetRepository.init();
    console.log('Dataset loaded');
  } catch (err) {
    console.error('Failed to load dataset:', err);
    process.exit(1);
  }
})();

registerErrorHandlers(app);

export default app;