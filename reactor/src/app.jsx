import * as React from 'react';
import App from './components/App';
let request = require('browser-request');

let el = document.getElementById('main');

function invoiceGenerated(err, httpResponse, data) {
let message = 'invoice generated';
    if (err) {
        message = 'invoice failed : ' + err;
    }
    if (httpResponse.status >= 400) {
        message = 'invoice failed : ' + (data && data.error);
    }
    React.render((
            <App
                message={message}
                generate={generate}
            />
        ),
        el
    );

}

function generate(data) {
    request({
        uri: '/api/invoice',
        method: 'POST',
        json: data
    }, invoiceGenerated);
}

React.render((
        <App
            generate={generate}
        />
    ),
    el
);


