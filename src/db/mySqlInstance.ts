import { CRUDMySQL, IDocumentSchema, MySQL, MySQLSession } from 'crud-node';

import { mySqlConnection, mySqlSettings } from 'src/config';

export type ClientDatabase = MySQL;

export type ClientDatabaseSession = MySQLSession;

export class CRUDController<S extends string> extends CRUDMySQL<S> {
  constructor(db: ClientDatabase, schema: IDocumentSchema<S>) {
    super(db, schema);
  }
}

export const getInstance = (): ClientDatabase => {
  return new MySQL(mySqlConnection, mySqlSettings);
};
