import * as express from 'express';

const router = express.Router();
export default router;

router.route('/:id').get((req, res) => {
  let id = req.params.id;

  // ...

  // res.json(gameState);
});