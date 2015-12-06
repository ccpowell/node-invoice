// list invoices
let _ = require('lodash');
let invoices = require('./business/InvoiceStore');

function printInvoice(invoice) {
    let number = '2015-' + _.padLeft(invoice.number.toString(), 3, '0');
    let status = invoice.paid ? 'paid' : 'not yet';
    console.log(`${number} : ${status}`);
}

invoices.getInvoices()
    .then(invoices => {
        _.forEach(invoices, printInvoice);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
