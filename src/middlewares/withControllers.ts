import * as express from 'express';

import { CRUDMySQL } from 'crud-node';

import { ClientDatabase } from 'src/config';
import { DeviceController } from 'src/controllers';
import { UserProps, userSchema } from 'src/db';
import { AppWithDatabase } from 'src/types';

export interface IAppWithControllers extends express.Application {
  controllers: {
    userController: CRUDMySQL<UserProps>;
    deviceController: DeviceController;
  };
  initControllers: () => Promise<void>;
}

/**
 * withControllers
 * @param {express.Application} app
 * @returns {IAppWithControllers} app
 */
export const withControllers = <T>(
  app: express.Application & AppWithDatabase<ClientDatabase> & T,
): AppWithDatabase<ClientDatabase> & T & IAppWithControllers => {
  const userController = new CRUDMySQL<UserProps>(app.db, userSchema);
  const deviceController = new DeviceController(app);

  const controllers = [userController, deviceController];

  const appWithControllers = app as unknown as AppWithDatabase<ClientDatabase> & T & IAppWithControllers;

  appWithControllers.controllers = {
    userController,
    deviceController,
  };

  appWithControllers.initControllers = async () => {
    await Promise.all(
      controllers.map(async controller => {
        if ('init' in controller) {
          await app.db.usingSession(session => controller.init(session));
        }
      }),
    );
  };

  return appWithControllers;
};
