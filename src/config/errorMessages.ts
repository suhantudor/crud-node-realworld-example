import { AppError } from 'src/errors';
import { AppErrorConfig } from 'src/types';
import { errorToString } from 'src/utils';

export const errors = {
  errorOnStart: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM001', `Cannot start Crud Node Real World Example service ${errorToString(error)}`),

  errorOnRouteCreateDevice: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM002', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetDevice: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM003', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetDevices: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM004', `Invalid route: ${errorToString(error)}`),
  errorOnRouteUpdateDevice: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM005', `Invalid route: ${errorToString(error)}`),
  errorOnRouteDeleteDevice: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM006', `Invalid route: ${errorToString(error)}`),

  errorOnAddDevice: (): AppErrorConfig => AppError.makeError('ESEDM012', 'The device already exists'),

  uncaughtException: (error: Error): AppErrorConfig => AppError.makeError('ESEDM013', `'Uncaught Exception ${error}`),
  unhandledRejection: (error: Error, origin: any): AppErrorConfig =>
    AppError.makeError('ESEDM014', `'Unhandled Rejection at:${origin} reason: ${error}`),
};
