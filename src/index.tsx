import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'flexboxgrid/dist/flexboxgrid.min.css';
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
