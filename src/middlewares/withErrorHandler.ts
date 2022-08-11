// Core
import * as express from 'express';

import * as httpError from 'http-errors';

import { AppError } from 'src/errors';

export interface ILogger {
  error: (error: Error) => void;
}

export interface IErrorResponse {
  error: {
    code: string;
    message: string;
  };
  status: number;
  stack?: string;
}

/**
 * @function withErrorHandler
 * @param {Object} app
 * @return app
 */
export const withErrorHandler = <T>(
  app: express.Application & T,
  logger: ILogger,
  debug: boolean,
): express.Application & T => {
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(httpError(404));
  });

  app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(httpError(500, error));
  });

  if (logger) {
    app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error(error);
      next(error);
    });
  }

  app.use(
    (
      error: Error & { statusCode: number } & AppError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      const { statusCode = 500, code, message, stack } = error;
      const response: IErrorResponse = { error: { code, message }, status: statusCode };
      if (debug) {
        response.stack = stack;
      }
      res.status(statusCode);
      res.json(response);
    },
  );

  return app;
};
