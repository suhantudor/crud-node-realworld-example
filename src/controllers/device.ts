import { CRUDMySQL } from 'crud-node';

import { ClientDatabase } from 'src/config';
import { DeviceProps, deviceSchema } from 'src/db';
import { AppWithDatabase } from 'src/types';

/**
 * DeviceController
 */
export class DeviceController extends CRUDMySQL<DeviceProps> {
  constructor(app: AppWithDatabase<ClientDatabase>) {
    super(app.db, deviceSchema);
  }
}
