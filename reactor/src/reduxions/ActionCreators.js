import * as Constants from './Constants';

let request = require('browser-request');

export function asyncStarted(token) {
    return {type: Constants.Actions.AsyncStarted, token};
}

export function invoiceStarted(token) {
    return {type: Constants.Actions.InvoiceStarted, token};
}

export function asyncFailed(token, message) {
    return {type: Constants.Actions.AsyncFailed, token, message};
}

// may never get used
export function asyncFinished(token) {
    return {type: Constants.Actions.AsyncFinished, token};
}

export function invoiceGenerated(token, payload) {
    return {type: Constants.Actions.InvoiceGenerated, token, payload};
}

export function generateInvoice(token, invoiceData) {

    return function(dispatch) {

        function finish(err, httpResponse, data) {
            let message = null;
            if (err) {
                message = 'invoice failed : ' + err;
            }
            if (httpResponse.status >= 400) {
                message = 'invoice failed : ' + (data && data.error);
            }
            if (message) {
                dispatch(asyncFailed(token, message));
            } else {
                dispatch(invoiceGenerated(token, data));
            }
        }

        dispatch(invoiceStarted(token));
        request({
            uri: '/api/invoice',
            method: 'POST',
            json: invoiceData
        }, finish);
    };
}
