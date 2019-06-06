import * as express from 'express';
import * as asyncHandler from 'express-async-handler'
import * as passport from 'passport';
import * as userCtrl from '../controllers/user.controller';
import * as authCtrl from '../controllers/auth.controller';
import * as config from '../config/config';

const router = express.Router();
export default router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
