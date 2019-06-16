import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';

export function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
