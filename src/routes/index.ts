import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { ClientDatabase } from 'src/config';
import { IAppWithControllers } from 'src/middlewares';

import { deviceRouter } from './device';

export const appRouter = (
  app: express.Application & IAppWithControllers & IAppWithDatabase<ClientDatabase>,
): express.Router => {
  const router = express.Router();

  router.use('/v1/device-manager', deviceRouter(app));

  return router;
};
