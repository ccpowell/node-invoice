import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import * as Constants from './Constants';

// TODO: use withMutations
// Reducer
function reducer(state, action) {
    //console.log(action);

    switch (action.type) {

        case Constants.Actions.InvoiceStarted:
            // set invoice name to null
            state = state.update('createdInvoice', s => null);
            // push token into stack
            return state.update('asyncInProgress', (s) => s.add(action.token));
            break;

        case Constants.Actions.AsyncStarted:
            // push token into stack
            return state.update('asyncInProgress', (s) => s.add(action.token));
            break;

        case Constants.Actions.AsyncFailed:
            // remove action with token form asyncInProgress
            return state.update('asyncInProgress', (s) => s.delete(action.token));
            break;

        case Constants.Actions.InvoiceGenerated:
            // set message to invoice name
            state = state.update('createdInvoice', s => action.payload.invoice);
            // remove action with token form asyncInProgress
            return state.update('asyncInProgress', s => s.delete(action.token));
            break;

        case Constants.Actions.AsyncFinished:
            // remove action with token form asyncInProgress
            return state.update('asyncInProgress', (s) => s.delete(action.token));
            break;
    }
    return state;
}

let initialState = Immutable.Map({
    asyncInProgress: Immutable.Set(),
    createdInvoice: null
});

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
)(createStore);

// Store
let store = createStoreWithMiddleware(reducer, initialState);
export {store as default};

