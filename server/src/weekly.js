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

// find the latest week that is completely past
function getLatestWeek() {
  let start = moment().startOf('week');
  let end = start.clone().add(6, 'day');
  let today = moment().startOf('day');
  while (today.isBefore(end)) {
    start.add(-1, 'week');
    end.add(-1, 'week');
  }
  return {
    start: start.toObject(),
    end: end.toObject()
  };
}

let period = getLatestWeek();

writeInvoice({
  hours,
  rate,
  customerId,
  periodStart: period.start,
  periodEnd: period.end
})
.then(inv => {
  console.log(inv);
  process.exit(0);
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
