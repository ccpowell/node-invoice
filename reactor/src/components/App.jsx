import React from 'react';
let moment = require('moment');
let _ = require('lodash');
import shortid from 'shortid';

function momentToPeriod(mom) {
  return {
    year: mom.year(),
    month: mom.month(),
    date: mom.date()
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.bound = {
      generate: this.generate
        .bind(this)
    };
    this.weeks = App.weeks();
  }

  static weeks() {
    let numberOfWeeks = 4;
    var week = moment().startOf('week')
      .add(-1, 'days')
      .add(-numberOfWeeks, 'week');
    var weeks = _
      .map(_.range(numberOfWeeks), function(i) {
        week.add(1, 'week');
        return {
          start: week.clone(),
          end: week.clone()
            .add(6, 'day')
        };
      });
    return weeks;
  }

  generate(e) {
    e.preventDefault();

    let periodIndex = React.findDOMNode(this.refs.period)
      .value;
    let week = this.weeks[periodIndex];

    let info = {
      customerId: '5626cfe6a8786c70226d8816',
      periodStart: momentToPeriod(week.start),
      periodEnd: momentToPeriod(week.end),
      rate: React.findDOMNode(this.refs.rate)
        .value,
      hours: React.findDOMNode(this.refs.hours)
        .value
    };

    let token = shortid.generate();
    this.props
      .generateInvoice(token, info);
  }

  render() {
    let period = 'unknown';
    let message = null;
    if (this.props.createdInvoice) {
      message = (
        <div>
          <div>
            <a target="_blank" href={'/invoices/' + this.props.createdInvoice}>
              View&nbsp;
              {this.props.createdInvoice}
            </a>
          </div>
          <div>{this.props.createdInvoicePath}</div>
        </div>
      );
    }

    let fmt = 'M/D/YYYY';

    let periods = this.weeks
      .map((week) => {
        let start = week.start
          .format(fmt);
        let end = week.end
          .format(fmt);
        let period = start + ' - ' + end;
        return period;
      });

    let periodOptions = periods.map((period, index) => {
      return (
        <option value={index} key={index}>
          {period}
        </option>
      );
    });

    return (
      <div>
        <h1>Generate Invoice</h1 >
        <form className="pure-form pure-form-aligned">
          <div className="pure-control-group">
            <label htmlFor="hours">Hours</label>
            <input id="hours" type="text" ref="hours" placeholder="hours"/>
          </div>
          <div className="pure-control-group">
            <label htmlFor="period">Period</label>
            <select id="period" ref="period" defaultValue={periods[2]}>
              {periodOptions}
            </select>
          </div>
          <div className="pure-control-group">
            <label htmlFor="rate">Rate</label>
            <input id="rate" type="text" ref="rate" placeholder="hourly rate" defaultValue="73"/>
          </div>
          <div className="pure-controls">
            <button className="pure-button pure-button-primary" onClick={this.bound.generate}>
              Generate Invoice
            </button>
          </div>
        </form>
        {message}
      </div>
    );
  }
}

export {App as default};
