var store = require('../dist/business/InvoiceStore');
var mongoose = require('mongoose');
var customerId = mongoose.Types.ObjectId('5626cfe6a8786c70226d8816');

store.createInvoice({
  number: '2015-002',
  hours: 3,
  date: {year: 2015, month: 10, day: 21},
  customerId: customerId
})
.then(function(ret) {
  console.log(ret);
  process.exit(0);
})
.catch(function(err) {
  console.log(err);
  process.exit(0);
});
