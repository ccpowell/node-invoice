import React from 'react';
let moment = require('moment');
import shortid from 'shortid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.bound = {
      generate: this.generate
        .bind(this)
    }
  }

  generate(e) {
    e.preventDefault();

    let info = {
      period: React.findDOMNode(this.refs.period)
        .value,
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
            <input id="period" type="text" ref="period" defaultValue={period} placeholder="week"/>
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
