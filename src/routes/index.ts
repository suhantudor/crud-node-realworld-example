import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { ClientDatabase } from 'src/db';
import { IAppWithControllers } from 'src/middlewares';

import { deviceRouter } from './device';
import { userRouter } from './user';

export const appRouter = (
  app: express.Application & IAppWithControllers & IAppWithDatabase<ClientDatabase>,
): express.Router => {
  const router = express.Router();

  router.use('/v1/device-manager/device', deviceRouter(app));
  router.use('/v1/device-manager/user', userRouter(app));

  return router;
};
