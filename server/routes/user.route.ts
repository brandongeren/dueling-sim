import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();
export default router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
