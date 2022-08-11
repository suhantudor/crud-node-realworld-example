/* eslint-disable no-console */
import * as express from 'express';

import { withMySQL, withMySQLX } from 'crud-node';

import { ClientDatabase, errors, mySqlConnection, mySqlSettings } from 'src/config';
import { IAppWithControllers, withApi, withControllers } from 'src/middlewares';
import { AppWithDatabase } from 'src/types';
import { appInfo, envGet, envGetRequired } from 'src/utils';

export const startService = async (env: typeof process.env): Promise<void> => {
  try {
    process.on('uncaughtException', (err: Error) => {
      console.error(errors.uncaughtException(err));
    });
    process.on('unhandledRejection', (err: Error, origin: any) => {
      console.error(errors.unhandledRejection(err, origin));
    });
    process.on('beforeExit', code => {
      console.log(`Process will exit with code: ${code}`);
    });
    process.on('exit', code => {
      console.log(`Process exited with code: ${code}`);
    });

    const appName = envGetRequired(env, 'APP_NAME');
    const debug = envGet(process.env, 'DEBUG_API') === 'true';

    const app = withApi<AppWithDatabase<ClientDatabase> & IAppWithControllers>(
      withControllers<AppWithDatabase<ClientDatabase>>(withMySQL(null, mySqlConnection, mySqlSettings)),
      debug,
    );

    // Connect to a database
    await app.connectDb();

    // Initialize controllers
    await app.initControllers();

    const server = envGetRequired(env, 'SERVER');
    const serverPort = envGetRequired(env, 'SERVER_PORT');
    const nodeEnv = envGetRequired(env, 'NODE_ENV');
    app.listen(serverPort, () => console.log(appInfo(appName, server, serverPort, nodeEnv)));
  } catch (error) {
    console.error(errors.errorOnStart(error as Error));
    process.exit(1);
  }
};
