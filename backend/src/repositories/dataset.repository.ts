import fs from 'node:fs/promises';
import path from 'node:path';
import type { DatasetSchema } from '../types/dataset.types';

class DatasetRepository {
  private data?: DatasetSchema;

  async init(datasetPath = path.resolve(process.cwd(), 'DataSet.json')): Promise<void> {
    try {
      const raw = await fs.readFile(datasetPath, 'utf8');
      this.data = JSON.parse(raw) as DatasetSchema;
    } catch (err) {
      console.error('DatasetRepository.init error:', err);
      throw new Error('Failed to load dataset');
    }
  }

  private ensureLoaded(): void {
    if (!this.data) {
      throw new Error('Dataset not loaded: call init() first');
    }
  }

  getData(): DatasetSchema {
    try {
      this.ensureLoaded();
      return this.data as DatasetSchema;
    } catch (err) {
      console.error('DatasetRepository.getData error:', err);
      throw err;
    }
  }
}

export const datasetRepository = new DatasetRepository();