import * as React from 'react';
import {Provider} from 'react-redux';
import SmartApp from './reduxions/AppContainer';
import store from './reduxions/Store';

let el = document.getElementById('main');

React.render((
        <Provider store={store}>
            {() => <SmartApp />}
        </Provider>
    ),
    el
);
