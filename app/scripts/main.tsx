import * as React from 'react';
import { Provider } from 'react-redux'
import { browserHistory, Redirect, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';

import AboutContainer from './about/container'
import HistoryContainer from './containers/historyContainer'
import { App } from './components/app'
import { Start } from './components/start'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export const Main = (props: void) => (
    <Provider store={ store }>
        <Router history={ history } >
            <Route component={ App }>
                <Route path="/home" component={ Start } />
                <Route path="/history" component={ HistoryContainer } />
                <Route path="/about" component={ AboutContainer } />
            </Route>
            <Redirect from="/" to="/home" />
        </Router>
    </Provider>
);