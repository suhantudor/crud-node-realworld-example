import { MySQLXConnectionConfig, MySQLXPoolingOptions } from 'crud-node';

import { envGet, envGetRequired } from 'src/utils';

export const mySqlXConnection: MySQLXConnectionConfig = {
  host: envGetRequired(process.env, 'MYSQLX_DATABASE_HOST'),
  port: Number(envGetRequired(process.env, 'MYSQLX_DATABASE_PORT')),
  user: envGetRequired(process.env, 'MYSQLX_ROOT_USER'),
  password: envGetRequired(process.env, 'MYSQLX_ROOT_PASSWORD'),
  schema: envGetRequired(process.env, 'MYSQLX_DATABASE'),
  timezone: envGet(process.env, 'MYSQLX_TZ'),
};

export const mySqlXPooling: MySQLXPoolingOptions = {
  enabled: true,
  maxIdleTime: 30000,
  maxSize: 25,
  queueTimeout: 10000,
};

export const mySqlXSettings = {
  ciCollation: String(envGet(process.env, 'MYSQL_CI_COLLATION')),
};
