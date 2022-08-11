import { CRUDMySQLX, IDocumentSchema, MySQLX, MySQLXSession } from 'crud-node';

import { mySqlXConnection, mySqlXPooling, mySqlXSettings } from 'src/config';

export type ClientDatabase = MySQLX;

export type ClientDatabaseSession = MySQLXSession;

export class CRUDController<S extends string> extends CRUDMySQLX<S> {
  constructor(db: ClientDatabase, schema: IDocumentSchema<S>) {
    super(db, schema);
  }
}

export const getInstance = (): ClientDatabase => {
  return new MySQLX(mySqlXConnection, { pooling: mySqlXPooling }, mySqlXSettings);
};
