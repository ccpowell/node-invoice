/**
 * Created by chris_000 on 10/8/2015.
 */
import React from 'react';
import { bindActionCreators} from 'redux';
import { Provider, connect } from 'react-redux';
import App from '../components/App';
import * as actions from './ActionCreators';

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        isAsyncInProgress: (state.get('asyncInProgress').size > 0),
        createdInvoice: state.get('createdInvoice'),
        createdInvoicePath: state.get('createdInvoicePath')
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    let bac = bindActionCreators(actions, dispatch);
    return bac;
}

// Connected Component:
let SmartApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export {SmartApp as default};
