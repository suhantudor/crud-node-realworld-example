import * as Joi from 'joi';

export const userSchema = {
  createUserParams: Joi.object({}),
  createUserBody: Joi.object({}),
  getUser: Joi.object({
    userId: Joi.string(),
  }),
  getUsers: Joi.object({}),
  updateUserParams: Joi.object({
    userId: Joi.string(),
  }),
  updateUserBody: Joi.object(),
  deleteUser: Joi.object({
    userId: Joi.string(),
  }),
  getUserDevices: Joi.object({
    userId: Joi.string(),
  }),
};
