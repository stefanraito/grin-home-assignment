import { Express, Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

/**
 * Registers catch‑all 404 and global error handlers
 */
export function registerErrorHandlers(app: Express): void {
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const err: HttpError = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? 500;

    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }

    res.status(status).json({
      error: {
        message: err.message || 'Internal Server Error',
        status,
      },
    });
  });
}