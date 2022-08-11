import { MySQLX, MySQLXConnectionConfig, MySQLXPoolingOptions } from 'crud-node';

import { AppWithDatabase } from 'src/types';

export const withMySQLX = <Application>(
  app: Application,
  connection: MySQLXConnectionConfig,
  settings: { ciCollation: string },
  pooling: MySQLXPoolingOptions,
): Application & AppWithDatabase<MySQLX> => {
  const appWithDatabase = app as Application & AppWithDatabase<MySQLX>;
  if (!appWithDatabase.db) {
    appWithDatabase.db = new MySQLX(connection, { pooling }, settings);
  }

  appWithDatabase.connectDb = async (): Promise<void> => {
    await appWithDatabase.db.connect();
  };

  return appWithDatabase;
};
