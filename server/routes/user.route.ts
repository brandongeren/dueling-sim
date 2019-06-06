import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import {insert} from '../controllers/user.controller';

const router = express.Router();
export default router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insertUser));

async function insertUser(req, res) {
// function insertUser(req, res) {
  let user = await insert(req.body);
  // let user = insert(req.body);
  res.json(user);
}
