import { IDocument, IDocumentSchema, IDocumentValidation, generateId, getDocument } from 'crud-node';

export enum DeviceProps {
  _id = '_id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  userId = 'userId',
  buildId = 'buildId',
  buildNumber = 'buildNumber',
  brand = 'brand',
  deviceId = 'deviceId',
  device = 'device',
  name = 'name',
  ipAddress = 'ipAddress',
  manufacturer = 'manufacturer',
  platform = 'platform',
  model = 'model',
  serial = 'serial',
  uniqueId = 'uniqueId',
  isLogged = 'isLogged',
}

export const validation: IDocumentValidation<DeviceProps> = {
  level: 'strict',
  schema: {
    type: 'object',
    description: 'Devices',
    properties: {
      _id: { type: 'string', description: 'The unique identifier for a device' },
      createdAt: { type: 'string', description: 'The date of device creation' },
      updatedAt: { type: 'string', description: 'The date of device update' },
      userId: { type: 'string', description: 'The user id that device belongs' },
      buildId: { type: 'string', description: 'The build id of device' },
      buildNumber: { type: 'string', description: 'The build number of device' },
      brand: { type: 'string', description: 'The brand of device' },
      deviceId: { type: 'string', description: 'The device id of device' },
      device: { type: 'string', description: 'The name of the industrial design of device' },
      name: { type: 'string', description: 'The name of device' },
      ipAddress: { type: 'string', description: 'The ip address of device' },
      manufacturer: { type: 'string', description: 'The manufacturer of device' },
      platform: { type: 'string', description: 'The platform that device belongs. e.g. web, mobile, windows, etc.' },
      model: { type: 'string', description: 'The model of device' },
      serial: { type: 'string', description: 'The serial of device' },
      uniqueId: { type: 'string', description: 'The unique id of device' },
      isLogged: { type: 'boolean', description: 'The flag that indicates the device is logged' },
    },
    required: [DeviceProps._id],
  },
};

export const deviceSchema: IDocumentSchema<DeviceProps> = {
  name: 'devices',
  alias: 'device',
  validation,
  generatedId: false,
  unique: [[DeviceProps.name]],
  getDocument: (data: Partial<IDocument<DeviceProps>>): IDocument<DeviceProps> => {
    const createdAt = Date.now().toString();
    const defaults: Partial<IDocument<DeviceProps>> = {
      _id: generateId(deviceSchema.alias),
      createdAt,
    };
    return getDocument(DeviceProps, data, defaults);
  },
};
