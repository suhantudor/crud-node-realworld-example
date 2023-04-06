import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { errors } from 'src/config';
import { ClientDatabase, UserProps } from 'src/db';
import { IAppWithControllers, withCatchException, withJoi } from 'src/middlewares';
import { userSchema } from 'src/validation';

export const userRouter = (app: IAppWithControllers & IAppWithDatabase<ClientDatabase>): express.Router => {
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
    '/',
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
    '/list',
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
    '/:userId',
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
    '/:userId',
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
   * /v1/device-manager/user/:userId
   */
  router.delete(
    '/:userId',
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
   * Count suspended users
   * /v1/device-manager/user/suspended/count
   */
  router.get(
    '/suspended/count',
    withJoi(userSchema.countSuspenedUsers, 'params', errors.errorOnRouteCountSuspendedUsers),
    withCatchException(async () =>
      db.usingSession(async session => {
        const data = await userController.getCount(session, {
          [UserProps.isSuspended]: true,
        });
        return data;
      }, true),
    ),
  );

  /**
   * Retrieve user devices
   * /v1/device-manager/user/:userId/list
   */
  router.delete(
    '/:userId/list',
    withJoi(userSchema.getUserDevices, 'params', errors.errorOnRouteGetUserDevices),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { userId },
        } = req;
        const data = await deviceController.filterDocuments(session, { userId });
        return data;
      }, true),
    ),
  );

  return router;
};
