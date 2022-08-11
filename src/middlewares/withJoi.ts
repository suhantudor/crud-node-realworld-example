// Core
import * as express from 'express';

import * as Joi from 'joi';

import { RequestValidationErrorConfig } from 'src/types';
import { joiValidator } from 'src/utils';

export const withJoi =
  (
    schema: Joi.Schema,
    property: keyof express.Request,
    error?: RequestValidationErrorConfig | ((...params: any[]) => RequestValidationErrorConfig),
  ): ((req: express.Request, res: express.Response, next: express.NextFunction) => void) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const validationResult = joiValidator(req, schema, property, error);
    next(validationResult);
  };
