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
  errorOnRouteCountLoggedDevices: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM007', `Invalid route: ${errorToString(error)}`),

  errorOnRouteCreateUser: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM008', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetUser: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM009', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetUsers: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM010', `Invalid route: ${errorToString(error)}`),
  errorOnRouteUpdateUser: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM011', `Invalid route: ${errorToString(error)}`),
  errorOnRouteDeleteUser: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM012', `Invalid route: ${errorToString(error)}`),
  errorOnRouteGetUserDevices: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM013', `Invalid route: ${errorToString(error)}`),
  errorOnRouteCountSuspendedUsers: (error: Error): AppErrorConfig =>
    AppError.makeError('ESEDM014', `Invalid route: ${errorToString(error)}`),

  errorOnAddDevice: (): AppErrorConfig => AppError.makeError('ESEDM015', 'The device already exists'),

  uncaughtException: (error: Error): AppErrorConfig => AppError.makeError('ESEDM016', `'Uncaught Exception ${error}`),
  unhandledRejection: (error: Error, origin: any): AppErrorConfig =>
    AppError.makeError('ESEDM017', `'Unhandled Rejection at:${origin} reason: ${error}`),
};
