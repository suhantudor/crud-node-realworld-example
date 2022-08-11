// Core
import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { ClientDatabase } from 'src/db';

/**
 * @function withDatabase
 * @param {Object} app
 * @param {Function} db Creates an instance of database
 * @return app with db
 */
export const withDatabase = <T, D>(
  app: express.Application & T,
  db: ClientDatabase & D,
): express.Application & T & IAppWithDatabase<ClientDatabase & D> => {
  const appWithDatabase = app as unknown as express.Application & T & IAppWithDatabase<ClientDatabase & D>;
  if (!appWithDatabase.db) {
    appWithDatabase.db = db;
  }
  appWithDatabase.connectDb = async () => {
    await appWithDatabase.db.connect();
  };
  return appWithDatabase;
};
