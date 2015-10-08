import * as express from 'express';
import * as parser from 'body-parser';

var router = express.Router();
router.use(parser.json());

router.post('/invoice', function(req, res) {
  let {
    rate, hours, period, number
  } = req.body;
  res.sendStatus(500);
});


export {
  router as
  default
};
