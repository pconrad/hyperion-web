import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin = require('react-tap-event-plugin');

import Main from './main';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

console.log('index.tsx');

ReactDOM.render(
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>,
    document.getElementById('app')
);