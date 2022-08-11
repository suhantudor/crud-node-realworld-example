import { MySQL, MySQLConnectionConfig } from 'crud-node';

import { AppWithDatabase } from 'src/types';

export const withMySQL = <Application>(
  app: Application,
  connection: MySQLConnectionConfig,
  settings: { ciCollation: string },
): Application & AppWithDatabase<MySQL> => {
  const appWithDatabase = app as Application & AppWithDatabase<MySQL>;
  if (!appWithDatabase.db) {
    appWithDatabase.db = new MySQL(connection, settings);
  }
  appWithDatabase.connectDb = async (): Promise<void> => {
    await appWithDatabase.db.connect();
  };
  return appWithDatabase;
};
