import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt';
import * as bcrypt from 'bcrypt';

import User from '../models/user.model';
import * as config from './config';

const ExtractJwt = PassportJWT.ExtractJwt;
const JwtStrategy = PassportJWT.Strategy;


const localLogin = new passportLocal.Strategy({
  usernameField: 'username'
}, async (username, password, done) => {
  let user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, { message: 'Your login details could not be verified. Please try again.' });
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  let user = await User.findById(payload._id);
  if (!user) {
    return done(null, false);
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

export default passport;
