import * as React from 'react';
import { Provider } from 'react-redux'
import { browserHistory, Redirect, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers } from 'redux'

import { About } from './components/about'
import { App } from './components/app'
import { Start } from './components/start'
import reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export const Main = (props: void) => (
    <Provider store={ store }>
        <Router history={ history } >
            <Route component={ App }>
                <Route path="/home" component={ Start } />
                <Route path="/about" component={ About } />
            </Route>
            <Redirect from="/" to="/home" />
        </Router>
    </Provider>
);