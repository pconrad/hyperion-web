import React from 'react';

import { IndexRedirect, Router, Route } from 'react-router';

import { browserHistory } from 'react-router';

// Import all pages
import App from 'pages/App/';
import CurrentPage from 'pages/CurrentReadingsPage/';
import HomePage from 'pages/HomePage/';
import RecentReadingsPage from 'pages/RecentReadingsPage';
import HistoryPage from 'pages/HistoryPage';

// Mind the order of routes: first match is served
const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRedirect to="/home" />
            <Route path="/home" component={ HomePage } />
            <Route path="/current" component={ CurrentPage } />
            <Route path="/recent" component={ RecentReadingsPage } />
            <Route path="/history" component={ HistoryPage } />
        </Route>
    </Router>
);

export default routes;
