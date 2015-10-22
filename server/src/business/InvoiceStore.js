import * as _ from 'lodash';
import mongoose from './MongoDb';

// N.B.
/*
months are 0 based. The date fields can be used directly by moment.
Each customer has a default rate, but it might vary by invoice,
so the invoice has a rate field.
*/

let invoiceSchema = mongoose.Schema({
  number: {
    type: Number,
    index: true
  },
  hours: Number,
  rate: Number,
  date: {
    year: Number,
    month: Number,
    date: Number
  },
  due: {
    year: Number,
    month: Number,
    date: Number
  },
  periodStart: {
    year: Number,
    month: Number,
    date: Number
  },
  periodEnd: {
    year: Number,
    month: Number,
    date: Number
  },
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
    // get next invoice number
    return InvoiceDoc.findOne()
      .sort('-number')
      .exec()
      .then(biggest => {
        doc.number = biggest ? biggest.number + 1 : 1;
        return doc.save();
      });
  }

  createCustomer(customer) {
    let doc = new CustomerDoc(customer);
    return doc.save();
  }

  getCustomerById(id) {
    return CustomerDoc.findById(id);
  }
}

let store = new InvoiceStore();
export {
  store as
  default
};
