import { generateId } from 'crud-node';

import { IDocument, IDocumentSchema, IDocumentValidation, getDocument } from '../../types';

export enum UserProps {
  _id = '_id',
  role = 'role',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  confirmedAt = 'confirmedAt',
  firstName = 'firstName',
  lastName = 'lastName',
  phoneNumber = 'phoneNumber',
  email = 'email',
  password = 'password',
  gender = 'gender',
  age = 'age',
  dateOfBirth = 'dateOfBirth',
  nationality = 'nationality',
  color = 'color',
  maritalStatus = 'maritalStatus',
  avatar = 'avatar',
  notification = 'notification',
  language = 'language',
  theme = 'theme',
  isDeleted = 'isDeleted',
  isSuspended = 'isSuspended',
}

export const validation: IDocumentValidation<UserProps> = {
  level: 'strict',
  schema: {
    type: 'object',
    description: 'User Account',
    properties: {
      _id: { type: 'string', description: 'The unique identifier for an user account' },
      role: { type: 'string', description: 'The role of user account' },
      createdAt: { type: 'string', description: 'The date of user account creation' },
      updatedAt: { type: 'string', description: 'The date of user account update' },
      confirmedAt: { type: 'string', description: 'The date of confirmation user' },
      firstName: { type: 'string', description: 'The first name of user' },
      lastName: { type: 'string', description: 'The last name of user' },
      phoneNumber: { type: 'string', description: 'The phone number of user' },
      email: { type: 'string', description: 'The email of user account' },
      password: { type: 'string', description: 'The password of user' },
      gender: { type: 'string', description: 'The gender of user' },
      age: { type: 'string', description: 'The age of user' },
      dateOfBirth: { type: 'string', description: 'The date of birth of user' },
      nationality: { type: 'string', description: 'The nationality of user' },
      color: { type: 'string', description: 'The color of user' },
      maritalStatus: { type: 'string', description: 'The marital status of user' },
      avatar: { type: 'string', description: 'The user account profile image' },
      language: { type: 'string', description: 'The user app language' },
      notification: { type: 'string', description: 'The user app notification settings' },
      theme: { type: 'string', description: 'The user app theme' },
      isDeleted: { type: 'boolean', description: 'The boolean that indicated if account was deleted' },
      isSuspended: { type: 'boolean', description: 'The boolean that indicated if account was suspended' },
    },
    required: [UserProps._id, UserProps.email],
  },
};

export const userSchema: IDocumentSchema<UserProps> = {
  name: 'users',
  alias: 'user',
  validation,
  generatedId: false,
  unique: [[UserProps.phoneNumber], [UserProps.email]],
  getDocument: (data: Partial<IDocument<UserProps>>): IDocument<UserProps> => {
    const createdAt = Date.now().toString();
    const defaults: Partial<IDocument<UserProps>> = {
      _id: generateId(userSchema.alias),
      createdAt,
    };
    return getDocument(UserProps, data, defaults);
  },
};
