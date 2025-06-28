import type { Request, Response } from 'express';
import { getStats } from '../services/stats.service';


export const statsController = (req: Request, res: Response): void => {
  try {
    const { from, to } = req.query as { from?: string; to?: string };
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    if ((from && isNaN(fromDate!.getTime())) || (to && isNaN(toDate!.getTime()))) {
      res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
      return;
    }

    const stats = getStats(fromDate, toDate);
    res.json(stats);
  } catch (err) {
    console.error('Error in statsController:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: (err as Error).message,
    });
  }
};