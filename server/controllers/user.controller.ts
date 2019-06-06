import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
// @ts-ignore
const User = require('../models/user.model');

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

export async function insert(user) {
// export function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  // user = Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  let newUser = new User(user);
  // @ts-ignore
  await newUser.save();
  console.log('user saved');
  console.log('object username: ' + newUser.username);
  console.log('object email: ' + newUser.email);
  console.log('object hashedPassword: ' + newUser.hashedPassword);
  return newUser;
}
