import * as express from 'express';

export interface AppWithDatabase<T> extends express.Application {
  db: T;
  connectDb: () => Promise<void>;
}
