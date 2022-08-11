// Core
import * as express from 'express';
import * as httpError from 'http-errors';
import * as Joi from 'joi';

import { RequestValidationErrorConfig } from 'src/types';

export const REQUEST_VALIDATION_ERROR_CODE = 422;

export const joiValidator = (
  req: express.Request,
  schema: Joi.Schema,
  property: keyof express.Request,
  error?: RequestValidationErrorConfig | ((...params: any[]) => RequestValidationErrorConfig),
): httpError.HttpError | undefined => {
  const data = req[property];
  const { error: validationError } = schema.validate(data);

  if (!validationError) {
    return undefined;
  }
  const { details } = validationError;
  const joiError: RequestValidationErrorConfig = { message: '', code: '' };
  if (error) {
    if (typeof error === 'object') {
      joiError.message = error.message;
      joiError.code = error.code;
    } else {
      const customError = error(validationError);
      joiError.message = customError.message;
      joiError.code = customError.code;
    }
  } else {
    joiError.message = details.map((msg: Joi.ValidationErrorItem) => msg.message).join(',');
  }
  return httpError(REQUEST_VALIDATION_ERROR_CODE, joiError);
};
