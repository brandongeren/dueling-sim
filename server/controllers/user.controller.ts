import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import '../models/user.model';

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

// TODO: add exception handling here 
// more info: https://wanago.io/2018/12/24/typescript-express-registering-authenticating-jwt/
// i think it's number 2 or 3 in the tutorial series
export async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  // TODO: create a naming convention for mongoose schemas
  return await new userSchema(user).save();
}
