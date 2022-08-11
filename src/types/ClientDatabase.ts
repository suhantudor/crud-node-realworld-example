// Core
import * as express from 'express';

export interface ClientDatabase<S> {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  healthcheck: () => Promise<void>;
  withTransaction: <P>(
    callback: (req: express.Request, res: express.Response, trx?: unknown) => Promise<P>,
  ) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
  usingSession: <P>(callback: (session?: S) => Promise<P>, transacted?: boolean) => Promise<P>;
}
