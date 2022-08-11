declare namespace NodeJS {
  interface Global {
    logger: {
      error: (...meta: any[]) => void;
      warn: (...meta: any[]) => void;
      info: (...meta: any[]) => void;
      log: (...meta: any[]) => void;
    };
  }
}

declare module 'crude-node';
