import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { DeviceController, UserController } from 'src/controllers';
import { ClientDatabase } from 'src/db';

export interface IAppWithControllers extends express.Application {
  controllers: {
    userController: UserController;
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
  app: express.Application & IAppWithDatabase<ClientDatabase> & T,
): IAppWithDatabase<ClientDatabase> & T & IAppWithControllers => {
  const userController = new UserController(app);
  const deviceController = new DeviceController(app);

  const controllers = [userController, deviceController];

  const appWithControllers = app as unknown as IAppWithDatabase<ClientDatabase> & T & IAppWithControllers;

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
