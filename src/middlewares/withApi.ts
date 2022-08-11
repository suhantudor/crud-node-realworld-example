import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { ClientDatabase } from 'src/db';
import { IAppWithControllers, withErrorHandler } from 'src/middlewares';
import { appRouter } from 'src/routes';

/**
 * Routes for all the endpoints of the app
 * @param {express.Application} app
 * @param {Function} registerFriendlyExceptions
 * @returns {IAppWithApi} app
 */
export const withApi = <T>(
  app: express.Application & IAppWithControllers & IAppWithDatabase<ClientDatabase> & T,
  debug: boolean,
): express.Application & IAppWithControllers & IAppWithDatabase<ClientDatabase> & T => {
  const appWithApi = app as unknown as IAppWithControllers & IAppWithDatabase<ClientDatabase> & T;

  const router = appRouter(appWithApi);

  appWithApi.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.app = appWithApi;
    next();
  });

  appWithApi.use(express.urlencoded({ extended: true }));
  appWithApi.use(express.json());
  appWithApi.use(router);

  withErrorHandler(app, console, debug);

  return appWithApi;
};
