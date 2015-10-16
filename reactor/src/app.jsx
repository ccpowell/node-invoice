import * as React from 'react';
import {Provider} from 'react-redux';
import SmartApp from './reduxions/AppContainer';
import store from './reduxions/Store';

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
        <Provider store={store}>
            {() => <SmartApp />}
        </Provider>
    ),
    el
);


