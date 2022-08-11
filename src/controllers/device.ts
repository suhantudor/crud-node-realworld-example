import { IAppWithDatabase } from 'crud-node';

import { CRUDController, ClientDatabase, DeviceProps, deviceSchema } from 'src/db';

/**
 * DeviceController
 */
export class DeviceController extends CRUDController<DeviceProps> {
  constructor(app: IAppWithDatabase<ClientDatabase>) {
    super(app.db, deviceSchema);
  }
}
