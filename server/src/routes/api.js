// TODO: check userID? integrate Identity using OAuth?

import * as express from 'express';
import * as parser from 'body-parser';
import writeInvoice from '../business/invoiceWriter';
let path = require('path');

var router = express.Router();
router.use(parser.json());

router.post('/invoice', function (req, res) {
    let {
        rate, hours, periodStart, periodEnd, customerId
        } = req.body;
        let invoiceData = {
      rate, hours, periodStart, periodEnd, customerId
    }
    console.log(invoiceData);

    writeInvoice(invoiceData)
        .then((invoice) => res.status(200).json(invoice))
        .catch((err) => res.status(500).send({error: err.toString()}));
});

export {
    router as
        default
};
