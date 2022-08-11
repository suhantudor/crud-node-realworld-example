import * as express from 'express';

import { ClientDatabase, errors } from 'src/config';
import { IAppWithControllers, withCatchException, withJoi } from 'src/middlewares';
import { AppWithDatabase } from 'src/types';
import { userSchema } from 'src/validation';

export const deviceRouter = (app: IAppWithControllers & AppWithDatabase<ClientDatabase>): express.Router => {
  const router = express.Router();
  const {
    controllers: { deviceController, userController },
    db,
  } = app;

  /**
   * Create user
   * /v1/device-manager/user
   */
  router.post(
    '/user',
    withJoi(userSchema.createUserParams, 'params', errors.errorOnRouteCreateUser),
    withJoi(userSchema.createUserBody, 'body', errors.errorOnRouteCreateUser),
    withCatchException(async req =>
      db.usingSession(async session => {
        const { body: payload } = req;
        const data = await userController.createDocument(session, payload);
        return data;
      }, true),
    ),
  );

  /**
   * List users
   * /v1/device-manager/user/list
   */
  router.get(
    '/user/list',
    withJoi(userSchema.getUsers, 'params', errors.errorOnRouteGetUsers),
    withCatchException(async () =>
      db.usingSession(async session => {
        const data = await userController.getDocuments(session);
        return data;
      }),
    ),
  );

  /**
   * Retrive user
   * /v1/device-manager/user/:userId
   */
  router.get(
    '/user/:userId',
    withJoi(userSchema.getUser, 'params', errors.errorOnRouteGetUser),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { userId },
        } = req;
        const data = await userController.getDocument(session, userId);
        return data;
      }),
    ),
  );

  /**
   * Update user
   * /v1/device-manager/user/:userId
   */
  router.put(
    '/user/:userId',
    withJoi(userSchema.updateUserParams, 'params', errors.errorOnRouteUpdateUser),
    withJoi(userSchema.updateUserBody, 'body', errors.errorOnRouteUpdateUser),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { userId },
          body: payload,
        } = req;
        const data = await userController.updateDocument(session, userId, payload);
        return data;
      }, true),
    ),
  );

  /**
   * Delete user
   * /v1/device-manager/:userId
   */
  router.delete(
    '/user/:userId',
    withJoi(userSchema.deleteUser, 'params', errors.errorOnRouteDeleteUser),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { userId },
        } = req;
        const data = await userController.deleteDocument(session, userId);
        return data;
      }, true),
    ),
  );

  /**
   * PREMIUM
   * -------
   * Retrieve user devices
   * /v1/device-manager/user/:userId
   */
  // router.delete(
  //   '/user/:userId/list',
  //   withJoi(userSchema.getUserDevices, 'params', errors.errorOnRouteGetUserDevices),
  //   withCatchException(async req =>
  //     db.usingSession(async session => {
  //       const {
  //         params: { userId },
  //       } = req;
  //       const data = await deviceController.filterDocuments(session, { userId });
  //       return data;
  //     }, true),
  //   ),
  // );

  return router;
};
