import { MySQLConnectionConfig } from 'crud-node';

import { envGet } from 'src/utils';

export const mySqlConnection: MySQLConnectionConfig = {
  host: envGet(process.env, 'MYSQL_DATABASE_HOST'),
  port: Number(envGet(process.env, 'MYSQL_DATABASE_PORT')),
  user: envGet(process.env, 'MYSQL_ROOT_USER'),
  password: envGet(process.env, 'MYSQL_ROOT_PASSWORD'),
  database: envGet(process.env, 'MYSQL_DATABASE'),
  charset: envGet(process.env, 'MYSQL_CHARSET'),
  timezone: envGet(process.env, 'MYSQL_TZ'),
};

export const mySqlSettings = {
  ciCollation: String(envGet(process.env, 'MYSQL_CI_COLLATION')),
};
