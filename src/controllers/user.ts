import { IAppWithDatabase } from 'crud-node';

import { CRUDController, ClientDatabase, UserProps, userSchema } from 'src/db';

/**
 * UserController
 */
export class UserController extends CRUDController<UserProps> {
  constructor(app: IAppWithDatabase<ClientDatabase>) {
    super(app.db, userSchema);
  }
}
