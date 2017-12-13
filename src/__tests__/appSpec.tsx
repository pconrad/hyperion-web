import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { BrowserRouter as Router } from 'react-router-dom';

import { App, AppState } from '../app';

describe('<App />', () => {
    const root = renderIntoDocument(
        <MuiThemeProvider>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>,
    );
    const app = findRenderedComponentWithType(root as React.Component<any, any>, App as any);

    describe('when clicking the hamburger', () => {
        it('should show the drawer', () => {
            // Arrange
            const appbar: React.Component<any> = findRenderedComponentWithType(root as React.Component<any>, AppBar);

            // Act
            appbar.props.onLeftIconButtonClick();

            // Assert
            expect((app.state as AppState).drawerOpen).toBe(true);
        });
    });

    describe('when clicking the menu', () => {
        it('should hide the drawer', () => {
            // Arrange
            const appbar: React.Component<any> = findRenderedComponentWithType(root as React.Component<any>, AppBar);
            appbar.props.onLeftIconButtonClick();
            const menuItems: Array<React.Component<any>> = scryRenderedComponentsWithType(root as React.Component<any>, MenuItem);

            // Act
            menuItems[0].props.onClick();

            // Assert
            expect((app.state as AppState).drawerOpen).toBe(false);
        });
    });
});
