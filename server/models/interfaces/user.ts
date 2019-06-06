import {Document} from 'mongoose';

export interface IUserModel extends Document {
  username: String,
  email: String,
  hashedPassword: String,
  createdAt?: Date,
  roles?: Array<String>,
  password?: String,
}