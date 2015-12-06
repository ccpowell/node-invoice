import * as _ from 'lodash';
import mongoose from './MongoDb';
let moment = require('moment');

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
    paid: Boolean,
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

function momentToPeriod(mom) {
    return {
        year: mom.year(),
        month: mom.month(),
        date: mom.date()
    };
}

class InvoiceStore {
    createNextWeeklyInvoice(invoice) {
        let doc = new InvoiceDoc(invoice);
        // get latest invoice 
        // use it to create start and end dates
        // add todays date 
        return InvoiceDoc.findOne()
          .sort('-number')
          .exec()
          .then(biggest => {
              doc.number = biggest ? biggest.number + 1 : 1;
              doc.periodStart = momentToPeriod(moment(biggest.periodStart).add(1, 'week'));
              doc.periodEnd = momentToPeriod(moment(biggest.periodEnd).add(1, 'week'));
              doc.date = momentToPeriod(moment());
              doc.due = momentToPeriod(moment().add(15, 'day'));
              return doc.save();
          });
    }

    getLastWeekly(customerId) {
        return InvoiceDoc.findOne()
          .sort('-number')
          .exec();
    }

    createDummyInvoice(number) {
        let doc = new InvoiceDoc({number});
        return doc.save();
    }

    createCustomer(customer) {
        let doc = new CustomerDoc(customer);
        return doc.save();
    }

    getCustomerById(id) {
        return CustomerDoc.findById(id);
    }

    getInvoices() {
        return InvoiceDoc.find()
            .sort('number')
            .exec();
    }

    getInvoiceByNumber(number) {
        return InvoiceDoc.findOne({number: number}).exec();
    }
}

let store = new InvoiceStore();
export {store as default};
