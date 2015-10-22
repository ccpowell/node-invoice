var store = require('../dist/business/InvoiceStore');
store.createInvoice({
  name: 'Staff IQ',
  address1: 'address1',
  address2: 'address2',
  city: 'Denver',
  state: 'CO',
  zip: 'zip',
  rate: 73
})
.then(function(ret) {
  console.log(ret);
  process.exit(0);
})
.catch(function(err) {
  console.log(err);
  process.exit(0);
});
console.log('running');
