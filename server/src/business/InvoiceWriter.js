let moment = require('moment');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));
let _ = require('lodash');
let path = require('path');
let invoices = require('./InvoiceStore');

let top = 'C:\\Users\\chris\\OneDrive\\Business\\2015';

function formatInvoice(invoice, customer) {
    let period = moment(invoice.periodStart).format('MMM DD, YYYY') + ' - ' +
      moment(invoice.periodEnd).format('MMM DD, YYYY');

    let charges = {
        hours: invoice.hours.toFixed(2),
        rate: '$' + `${invoice.rate}/hour`,
        period: period,
        total: '$' + (invoice.hours * invoice.rate).toFixed(2)
    };

    let pretty = {
        date: moment(invoice.date).format('MMM DD, YYYY'),
        due: moment(invoice.due).format('MMM DD, YYYY'),
        number: '2015-' + _.padLeft(invoice.number.toString(), 3, '0')
    };

    let formatted = `
<!DOCTYPE html>
<HTML>
<HEAD>
  <TITLE>Invoice</TITLE>
  <STYLE TYPE="text/css" media="all">
    table {
      clear: both;
      BORDER-COLLAPSE: collapse;
    }

    #invoiceHead {
      text-align: right;
      font: 200% bold;
    }

    .Address {
      width: 50%;
      clear: both;
      border: 1px solid black;
      margin-bottom: 25px;
    }

    .AddressHead {
      font-weight: bold;
      BACKGROUND-COLOR: #cccccc;
      text-align: center;
      border-bottom: 1px solid black;
    }

    .AddressBody {
      margin: 1em;
    }

    .SmallSection {
      text-align: center;
      width: 10em;
      border: 1px solid black;
      margin-bottom: 25px;
    }

    #Charges {
      width: 100%;
      border: 1px solid black;
    }

    #Charges td {
      padding-left: 1em;
      padding-right: 1em;
    }

    #Charges th {
      padding-left: 1em;
      padding-right: 1em;
      background-color: #DDD
    }

    #Notes {
      width: 70%;
    }

    #NotesHead {
      font-weight: bold;
      margin-top: 25px;
    }
  </STYLE>
</HEAD>
<BODY>
  <div id="invoiceHead">Invoice</div>
  <div style="float: right;">
    <div class="SmallSection">
      <div class="AddressHead">Invoice Number</div>
      ${pretty.number}</div>
    <div class="SmallSection">
      <div class="AddressHead">Date</div>
      ${pretty.date}</div>
    <div class="SmallSection">
      <div class="AddressHead">Due</div>
      ${pretty.due}</div>
  </div>
  <div class="Address">
    <div class="AddressHead">Pay To</div>
    <div class="AddressBody">
      Christopher C. Powell
      <BR /> 872 West Kettle Ave.
      <BR /> Littleton, CO 80120
      <BR /> 303-798-3816
      <BR />
    </div>
  </div>
  <div class="Address">
    <div class="AddressHead">Bill To</div>
    <div class="AddressBody">
      <div>${customer.name}</div>
      <div>${customer.address1}</div>
      <div>${customer.address2}</div>
      <div>${customer.city},&nbsp;${customer.state}&nbsp;${customer.zip}</div>
    </div>
  </div>
  <TABLE ID="Charges">
    <thead>
      <TR>
        <TH WIDTH="60%" align="left">
          Item
        </TH>
        <TH WIDTH="10%" align="right">
          Hours
        </TH>
        <TH WIDTH="15%" align="right">
          Rate
        </TH>
        <TH WIDTH="15%" align="right">
          Amount
        </TH>
      </TR>
    </thead>
    <tbody>
      <TR>
        <TD ALIGN="left">Consulting services for ${charges.period}</TD>
        <TD ALIGN="right">${charges.hours}</TD>
        <TD ALIGN="right">${charges.rate}</TD>
        <TD ALIGN="right">
          ${charges.total}</TD>
      </TR>
      <tr>
        <td colspan="4">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="3" align="right">Total Due</td>
        <td align="right">
          ${charges.total}</td>
      </tr>
    </tbody>
  </TABLE>
</BODY>

</HTML>`;

    return formatted;
}

function momentToPeriod(mom) {
    return {
        year: mom.year(),
        month: mom.month(),
        date: mom.date()
    };
}

export default function({hours, rate, customerId, periodStart, periodEnd}) {
    hours = parseFloat(hours);
    rate = parseFloat(rate);
    let date = moment().startOf('day');
    let outputFile = null;
    let invoiceName = null;
    let customer = null;

    if (!_.isFinite(hours)) {
        return Promise.reject(new Error('hours must be positive number'));
    }

    if (!_.isFinite(rate)) {
        return Promise.reject(new Error('rate must be positive number'));
    }

    // get customer
    return invoices.getCustomerById(customerId)
      .then(c => {
          // save it for later
          customer = c;
          let invoice = {
              hours,
              rate,
              date: momentToPeriod(moment()),
              due: momentToPeriod(moment().add(15, 'day')),
              periodStart,
              periodEnd,
              customerId: customer.id
          };
          return invoices.createNextWeeklyInvoice(invoice);
      })
      .then(invoice => {
          let formatted = formatInvoice(invoice, customer);
          let number = _.padLeft(invoice.number.toString(), 3, '0');
          invoiceName = invoice.date.year.toString() + '-' + number + '.html';
          outputFile = path.join(top, invoiceName);
          return fs.writeFileAsync(outputFile, formatted);
      })
      .then(() => {
          return {
              invoice: invoiceName,
              path: outputFile
          };
      });
}
