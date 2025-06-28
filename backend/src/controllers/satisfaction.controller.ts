import type { Request, Response } from 'express';
import { getSatisfaction } from '../services/satisfaction.service';

export const satisfactionController = (_req: Request, res: Response): void => {
  try {
    const data = getSatisfaction();
    res.json(data);
  } catch (err) {
    console.error('Error in satisfactionController:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: (err as Error).message,
    });
  }
};