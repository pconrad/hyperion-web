import React from 'react';

import { IndexRoute, Router, Route } from 'react-router';

import { browserHistory } from 'react-router';

// Import all pages
import CurrentPage from 'pages/CurrentReadingsPage/';
import HomePage from 'pages/HomePage/';
import Index from 'components/Home/';

// Mind the order of routes: first match is served
const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ HomePage }>
            <IndexRoute component={ HomePage } />
        </Route>
        <Route path="current" component={ CurrentPage } />
    </Router>
);

export default routes;
