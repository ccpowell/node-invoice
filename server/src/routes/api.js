// TODO: check userID? integrate Identity using OAuth?

import * as express from 'express';
import * as parser from 'body-parser';
import writeInvoice from '../business/invoiceWriter';
let path = require('path');

var router = express.Router();
router.use(parser.json());

router.post('/invoice', function (req, res) {
    let {
        rate, hours, period
        } = req.body;
    console.log(req.body);

    writeInvoice({hours, rate, period})
        .then((invoice) => res.status(200).json(invoice))
        .catch((err) => res.status(500).send({error: err.toString()}));
});

export {
    router as
        default
};
