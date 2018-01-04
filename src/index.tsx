import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';

const routes = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(
    <MuiThemeProvider>{ routes }</MuiThemeProvider>,
    document.getElementById('root') as HTMLElement,
);
