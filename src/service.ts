/* eslint-disable no-console */
import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { errors } from 'src/config';
import { ClientDatabase, getInstance } from 'src/db';
import { IAppWithControllers, withApi, withControllers, withDatabase } from 'src/middlewares';
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
    const db = getInstance();

    const app = withApi<IAppWithDatabase<ClientDatabase> & IAppWithControllers>(
      withControllers<IAppWithDatabase<ClientDatabase>>(withDatabase(express(), db)),
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
