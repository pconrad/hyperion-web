import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Redirect, Route, Router } from 'react-router';

import AboutContainer from './about/container';
import { App } from './app';
import { Start } from './components/start';
import HistoryContainer from './history/container';
import LiveContainer from './live/container';
import RecentContainer from './recent/container';

const routes = (
    <Router history={ browserHistory } >
        <Route component={ App }>
            <Route path='/home' component={ Start } />
            <Route path='/live' component={ LiveContainer } />
            <Route path='/history' component={ HistoryContainer } />
            <Route path='/recent' component={ RecentContainer } />
            <Route path='/about' component={ AboutContainer } />
        </Route>
        <Redirect from='/' to='/home' />
    </Router>
);

ReactDOM.render(
    <MuiThemeProvider>{ routes }</MuiThemeProvider>,
    document.getElementById('root') as HTMLElement,
);
