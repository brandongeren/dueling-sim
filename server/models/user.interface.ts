import * as mongoose from 'mongoose';

interface User {
  username: String,
  email: String,
  hashedPassword: String,
  createdAt: Date,
  roles: String[],
}

interface UserModel extends User, mongoose.Document {

}

export { 
  User,
  UserModel,
};