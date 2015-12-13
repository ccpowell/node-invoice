// weekly invoice
// Does latest sunday - saturday
// uses Staff IQ and default rate
// requires number of hours as an argument
var moment = require('moment');
var _ = require('lodash');
var writeInvoice = require('./business/InvoiceWriter');

var hours = parseFloat(process.argv[2]);
var customerId ='56291320fda175940cbae558';
var rate = 73;

writeInvoice({
  hours,
  rate,
  customerId
})
.then(inv => {
  console.log(inv);
  process.exit(0);
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
