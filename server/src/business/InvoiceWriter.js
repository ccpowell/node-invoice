let moment = require('moment');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));
let _ = require('lodash');
let path = require('path');

export default function ({hours, rate, period, number}) {
    hours = parseFloat(hours);
    rate = parseFloat(rate);

    if (!_.isFinite(hours)) {
        return Promise.reject(new Error('hours must be positive number'));
    }

    if (!_.isFinite(rate)) {
        return Promise.reject(new Error('rate must be positive number'));
    }
    if (!period) {
        return Promise.reject(new Error('period must be a valid date range'));
    }

    if (!number) {
        return Promise.reject(new Error('number must be a valid invoice number'));
    }

    let outputFile = path.join('c:\\tmp', `invoice-${number}.html`);
    try {
        fs.statSync(outputFile);
        return Promise.reject(new Error('invoice already exists'));
    } catch (err) {
    }
    let charges = {
        hours: hours.toFixed(2),
        rate: '$' + `${rate}/hour`,
        period: period,
        total: '$' + (hours * rate).toFixed(2)
    };

    let customer = {
        name: 'Customer',
        address1: 'address1',
        address2: 'address2',
        city: 'city',
        state: 'state',
        zip: 'zip'
    };

    let now = new Date();
    let due = new Date(now.valueOf());
    due.setDate(due.getDate() + 15);

    let invoice = {
        date: moment(now).format('MMM DD, YYYY'),
        due: moment(due).format('MMM DD, YYYY'),
        number: number
    };

    let formatted = `
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
      ${invoice.number}</div>
    <div class="SmallSection">
      <div class="AddressHead">Date</div>
      ${invoice.date}</div>
    <div class="SmallSection">
      <div class="AddressHead">Due</div>
      ${invoice.due}</div>
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

    return fs.writeFileAsync(outputFile, formatted);
}
