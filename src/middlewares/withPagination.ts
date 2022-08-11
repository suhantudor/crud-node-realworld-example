// Core
import * as express from 'express';

import { IOffsetPagination } from 'crud-node';
import * as Joi from 'joi';

import { RequestValidationErrorConfig } from 'src/types';
import { joiValidator } from 'src/utils';

/**
 * withPagination
 * @param {String} [topic]
 * @return middleware
 */
export const withPagination =
  (
    error?: RequestValidationErrorConfig | ((...params: any[]) => RequestValidationErrorConfig),
    property: keyof express.Request = 'query',
    schema?: Joi.ObjectSchema,
  ): ((req: express.Request, res: express.Response, next: express.NextFunction) => void) =>
  (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const paginationSchema = Joi.object({
      page: Joi.number().required(),
      pageSize: Joi.number().required(),
    });
    const fullSchema = schema ? Joi.object().concat(paginationSchema).concat(schema) : paginationSchema;
    const validationResult = joiValidator(req, fullSchema, property, error);
    if (validationResult) {
      next(validationResult);
    } else {
      const {
        query: { page, pageSize },
      } = req;
      const pagination: IOffsetPagination = {
        page: Number(page),
        pageSize: Number(pageSize),
      };
      res.locals.pagination = pagination;
      next();
    }
  };
