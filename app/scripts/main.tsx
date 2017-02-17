import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import * as React from 'react';
import { Provider } from 'react-redux'
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers } from 'redux'

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

export interface MainState {
    open: boolean
}

export default class Main extends React.Component<void, MainState> {
    constructor(props: void) {
        super(props);
        this.state = { open: false };
    }

    private handleToggle(e: any) {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <Provider store={ store }>
                <div>
                    <AppBar title={ 'Υπερίων' } onLeftIconButtonTouchTap={ e => this.handleToggle(e) } />
                    <Drawer
                        docked={ false }
                        onRequestChange={ (open) => this.setState({ open }) }
                        open={ this.state.open }
                    />
                    <Router history={ history }>
                        <Route path="/" component={ Start } />
                    </Router>
                </div>
            </Provider>
        );
    }
}