// list invoices
let _ = require('lodash');
let moment = require('moment');
let invoices = require('./business/InvoiceStore');

function printInvoice(invoice) {
    let number = '2015-' + _.padLeft(invoice.number.toString(), 3, '0');
    let period = moment(invoice.periodStart).format('MMM DD, YYYY') + ' - ' +
      moment(invoice.periodEnd).format('MMM DD, YYYY');
    let status = invoice.paid ? 'paid' : 'not yet paid';
    console.log(`${number} ${period} : ${status}`);
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
