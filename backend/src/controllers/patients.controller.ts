import type { Request, Response } from 'express';
import { getPatients } from '../services/patients.service';


export const patientsController = (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const { from, to } = req.query as { from?: string; to?: string };
    const fromDate = from ? new Date(from) : undefined;
    const toDate   = to ? new Date(to) : undefined;

    if ((from && isNaN(fromDate!.getTime())) || (to && isNaN(toDate!.getTime()))) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const result = getPatients(page, limit, fromDate, toDate);
    return res.json(result);
  } catch (err) {
    console.error('Error in patientsController:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: (err as Error).message,
    });
  }
};