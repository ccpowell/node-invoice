var store = require('../dist/business/InvoiceStore');

store.createDummyInvoice(10)
.then(function(ret) {
  console.log(ret);
  process.exit(0);
})
.catch(function(err) {
  console.log(err);
  process.exit(0);
});
