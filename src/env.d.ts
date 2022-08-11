declare namespace NodeJS {
  interface AppEnv {
    APP_NAME: string;
    NODE_ENV: string;
    NODE_PATH: string;
    TZ?: string;

    // Server Settings
    SERVER: string;
    SERVER_PORT: string;

    // MySQL
    MYSQL_DATABASE_HOST?: string;
    MYSQL_DATABASE_PORT?: string | number;
    MYSQL_DATABASE?: string;
    MYSQL_USER?: string;
    MYSQL_PASSWORD?: string;
    MYSQL_ROOT_USER?: string;
    MYSQL_ROOT_PASSWORD?: string;
    MYSQL_COLLATION?: string;
    MYSQL_CI_COLLATION?: string;
    MYSQL_CHARSET?: string;
    MYSQL_TZ?: string;

    // MySQLX
    MYSQLX_DATABASE_HOST?: string;
    MYSQLX_DATABASE_PORT?: string | number;
    MYSQLX_DATABASE?: string;
    MYSQLX_USER?: string;
    MYSQLX_PASSWORD?: string;
    MYSQLX_ROOT_USER?: string;
    MYSQLX_ROOT_PASSWORD?: string;
    MYSQLX_COLLATION?: string;
    MYSQLX_CI_COLLATION?: string;
    MYSQLX_CHARSET?: string;
    MYSQLX_TZ?: string;

    // DEBUG
    DEBUG_API?: boolean; // Enables stack trace in api response
  }

  type ProcessEnv = AppEnv;
}
