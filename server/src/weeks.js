var moment = require('moment');
var _ = require('lodash');

var week = moment().startOf('week').add(-1, 'days').add(-4, 'week');
var weeks = _.map(_.range(4), function(i) {
  week.add(1, 'week');
  return {
    start: week.clone(),
    end: week.clone().add(6, 'day')
  };
});
console.log(weeks);
