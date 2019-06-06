import * as express from 'express';
import * as asyncHandler from 'express-async-handler'
import * as passport from 'passport';
import {insert} from '../controllers/user.controller';
import {generateToken} from '../controllers/auth.controller';
import * as config from '../config/config';

const router = express.Router();
export default router;

router.post('/register', asyncHandler(register), login);
// @ts-ignore
router.post('/login', passport.authenticate('local', { session: false }), login);
// @ts-ignore
router.get('/me', passport.authenticate('jwt', { session: false }), login);

// async function register(req, res, next) {
async function register(req, res, next) {
  console.log('register attempted');
  let user = await insert(req.body);
  console.log('async function completed');
  if (user) {
    delete user.hashedPassword;
  }
  req.user = user;
  next()
}

function login(req, res) {
  console.log('login attempted');
  let user = req.user;
  let token = generateToken(user);
  res.json({ user, token });
}
