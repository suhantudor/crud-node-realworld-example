import * as express from 'express';

import { ClientDatabase } from 'src/config';
import { IAppWithControllers, withErrorHandler } from 'src/middlewares';
import { appRouter } from 'src/routes';
import { AppWithDatabase } from 'src/types';

/**
 * Routes for all the endpoints of the app
 * @param {express.Application} app
 * @param {Function} registerFriendlyExceptions
 * @returns {IAppWithApi} app
 */
export const withApi = <T>(
  app: express.Application & IAppWithControllers & AppWithDatabase<ClientDatabase> & T,
  debug: boolean,
): express.Application & IAppWithControllers & AppWithDatabase<ClientDatabase> & T => {
  const appWithApi = app as unknown as IAppWithControllers & AppWithDatabase<ClientDatabase> & T;

  const router = appRouter(appWithApi);

  appWithApi.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.app = appWithApi;
    next();
  });

  appWithApi.use(express.urlencoded({ extended: true }));
  appWithApi.use(express.json());
  appWithApi.use(router);

  withErrorHandler(app, global.logger, debug);

  return appWithApi;
};
