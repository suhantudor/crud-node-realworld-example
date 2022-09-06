import * as express from 'express';

import { IAppWithDatabase } from 'crud-node';

import { errors } from 'src/config';
import { ClientDatabase, DeviceProps } from 'src/db';
import { IAppWithControllers, withCatchException, withJoi } from 'src/middlewares';
import { deviceSchema } from 'src/validation';

export const deviceRouter = (app: IAppWithControllers & IAppWithDatabase<ClientDatabase>): express.Router => {
  const router = express.Router();
  const {
    controllers: { deviceController },
    db,
  } = app;

  /**
   * Create device
   * /v1/device-manager/device
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
   * /v1/device-manager/device/list
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
   * /v1/device-manager/device/:deviceId
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
   * /v1/device-manager/device/:deviceId
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
   * /v1/device-manager/device/:deviceId
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

  /**
   * Count logged devices
   * /v1/device-manager/device/logged/count
   */
  router.get(
    '/logged/count',
    withJoi(deviceSchema.countLoggedDevices, 'params', errors.errorOnRouteCountLoggedDevices),
    withCatchException(async () =>
      db.usingSession(async session => {
        const data = await deviceController.getCount(session, {
          [DeviceProps.isLogged]: true,
        });
        return data;
      }, true),
    ),
  );

  return router;
};
