import { SystemError, SystemErrorConfig } from 'src/types';

export class AppError extends Error implements SystemError {
  code: string;

  constructor({ code, message }: SystemErrorConfig) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }

  static makeError(code: string, message: string): SystemErrorConfig {
    return {
      code,
      message,
    };
  }

  toJSON(): SystemErrorConfig {
    return {
      code: this.code,
      message: this.message,
    };
  }

  toString(): string {
    return `${this.name} ${this.code} ${this.message}`;
  }
}
