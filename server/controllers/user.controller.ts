import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import {User} from '../models/user.model';

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
  await newUser.save((err, product) => {
    console.log(err);
    console.log('attempt at logging product');
    console.log('email: ' + product.email);
    console.log('hashed password' + product.hashedPassword);
    console.log('username: ' + product.username);
  });
  console.log('user saved');
  console.log('object username: ' + newUser.username);
  console.log('object email: ' + newUser.email);
  console.log('object hashedPassword: ' + newUser.hashedPassword);
  return newUser;
}
