import { AppErrorConfig, SystemError } from 'src/types';

export class AppError extends Error implements SystemError {
  code: string;

  constructor({ code, message }: AppErrorConfig) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }

  static makeError(code: string, message: string): AppErrorConfig {
    return {
      code,
      message,
    };
  }

  toJSON(): AppErrorConfig {
    return {
      code: this.code,
      message: this.message,
    };
  }

  toString(): string {
    return `${this.name} ${this.code} ${this.message}`;
  }
}
