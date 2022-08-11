import { CRUDMySQL } from 'crud-node';

import { ClientDatabase } from 'src/config';
import { UserProps, userSchema } from 'src/db';
import { AppWithDatabase } from 'src/types';

/**
 * UserController
 */
export class UserController extends CRUDMySQL<UserProps> {
  constructor(app: AppWithDatabase<ClientDatabase>) {
    super(app.db, userSchema);
  }
}
