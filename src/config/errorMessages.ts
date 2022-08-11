import { AppError } from 'src/errors';
import { SystemErrorConfig } from 'src/types';
import { errorToString } from 'src/utils';

export const errors = {
  errorOnStart: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM001', `Cannot start Crud Node Real World Example service ${errorToString(error)}`),

  errorOnRouteCreateDevice: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM002', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetDevice: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM003', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetDevices: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM004', `Invalid route: ${errorToString(error)}`),
  errorOnRouteUpdateDevice: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM005', `Invalid route: ${errorToString(error)}`),
  errorOnRouteDeleteDevice: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM006', `Invalid route: ${errorToString(error)}`),

  errorOnAddDevice: (): SystemErrorConfig => AppError.makeError('ESEDM012', 'The device already exists'),

  uncaughtException: (error: Error): SystemErrorConfig =>
    AppError.makeError('ESEDM013', `'Uncaught Exception ${error}`),
  unhandledRejection: (error: Error, origin: any): SystemErrorConfig =>
    AppError.makeError('ESEDM014', `'Unhandled Rejection at:${origin} reason: ${error}`),
};
