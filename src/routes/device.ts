import * as express from 'express';

import { ClientDatabase, errors } from 'src/config';
import { IAppWithControllers, withCatchException, withJoi } from 'src/middlewares';
import { AppWithDatabase } from 'src/types';
import { deviceSchema } from 'src/validation';

export const deviceRouter = (app: IAppWithControllers & AppWithDatabase<ClientDatabase>): express.Router => {
  const router = express.Router();
  const {
    controllers: { deviceController },
    db,
  } = app;

  /**
   * Create device
   * /v1/device-manager
   */
  router.post(
    '/',
    withJoi(deviceSchema.createDeviceParams, 'params', errors.errorOnRouteCreateDevice),
    withJoi(deviceSchema.createDeviceBody, 'body', errors.errorOnRouteCreateDevice),
    withCatchException(async req =>
      db.usingSession(async session => {
        const { body: payload } = req;
        const data = await deviceController.createDocument(session, payload);
        return data;
      }, true),
    ),
  );

  /**
   * List devices
   * /v1/device-manager/list
   */
  router.get(
    '/list',
    withJoi(deviceSchema.getDevices, 'params', errors.errorOnRouteGetDevices),
    withCatchException(async () =>
      db.usingSession(async session => {
        const data = await deviceController.getDocuments(session);
        return data;
      }),
    ),
  );

  /**
   * Retrive device
   * /v1/device-manager/:deviceId
   */
  router.get(
    '/:deviceId',
    withJoi(deviceSchema.getDevice, 'params', errors.errorOnRouteGetDevice),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { deviceId },
        } = req;
        const data = await deviceController.getDocument(session, deviceId);
        return data;
      }),
    ),
  );

  /**
   * Update device
   * /v1/device-manager/:deviceId
   */
  router.put(
    '/:deviceId',
    withJoi(deviceSchema.updateDeviceParams, 'params', errors.errorOnRouteUpdateDevice),
    withJoi(deviceSchema.updateDeviceBody, 'body', errors.errorOnRouteUpdateDevice),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { deviceId },
          body: payload,
        } = req;
        const data = await deviceController.updateDocument(session, deviceId, payload);
        return data;
      }, true),
    ),
  );

  /**
   * Delete device
   * /v1/device-manager/:deviceId
   */
  router.delete(
    '/:deviceId',
    withJoi(deviceSchema.deleteDevice, 'params', errors.errorOnRouteDeleteDevice),
    withCatchException(async req =>
      db.usingSession(async session => {
        const {
          params: { deviceId },
        } = req;
        const data = await deviceController.deleteDocument(session, deviceId);
        return data;
      }, true),
    ),
  );

  return router;
};
