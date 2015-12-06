// mark an invoice paid
'use strict';

var _ = require('lodash');
var invoices = require('./business/InvoiceStore');
var number = parseInt(process.argv[2], 10);

invoices.getInvoiceByNumber(number)
    .then(function (invoice) {
        invoice.paid = true;
        return invoice.save();
    })
    .then(function (x) {
        console.log('got something from save ');
        console.log(x);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });