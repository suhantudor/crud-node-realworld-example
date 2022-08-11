import * as Joi from 'joi';

export const deviceSchema = {
  createDeviceParams: Joi.object({
    userId: Joi.string(),
  }),
  createDeviceBody: Joi.object(),
  getDevice: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
  getDevices: Joi.object({
    userId: Joi.string(),
  }),
  updateDeviceParams: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
  updateDeviceBody: Joi.object(),
  deleteDevice: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
};
