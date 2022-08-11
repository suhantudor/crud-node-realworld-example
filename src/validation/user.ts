import * as Joi from 'joi';

export const userSchema = {
  createUserParams: Joi.object({
    userId: Joi.string(),
  }),
  createUserBody: Joi.object(),
  getUser: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
  getUsers: Joi.object({
    userId: Joi.string(),
  }),
  updateUserParams: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
  updateUserBody: Joi.object(),
  deleteUser: Joi.object({
    deviceId: Joi.string(),
    userId: Joi.string(),
  }),
  getUserDevices: Joi.object({
    userId: Joi.string(),
  }),
};
