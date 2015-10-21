import * as _ from 'lodash';
import mongoose from './MongoDb';

let invoiceSchema = mongoose.Schema({
  number: {
    type: String,
    index: true
  },
  hours: Number,
  date: Date,
  due: Date,
  periodStart: Date,
  periodEnd: Date,
  customerId: mongoose.Schema.Types.ObjectId
});
let InvoiceDoc = mongoose.model('Invoice', invoiceSchema);

let customerSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  rate: Number
});
let CustomerDoc = mongoose.model('Customer', customerSchema);

class InvoiceStore {
  createInvoice(invoice) {
    let doc = new InvoiceDoc(invoice);
    return doc.save();
  }

  createCustomer(customer) {
    let doc = new CustomerDoc(customer);
    return doc.save();
  }
}

let store = new InvoiceStore();
export {
  store as
  default
};
