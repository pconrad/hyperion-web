import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils'
import { MuiThemeProvider } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import { App } from '../app';

describe('<App />', () => {
    const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider><App /></MuiThemeProvider>);
    const app = ReactTestUtils.findRenderedComponentWithType(root, App);

    describe('when clicking the hamburger', () => {
        it('should show the drawer', () => {
            // Arrange
            const appbar = ReactTestUtils.findRenderedComponentWithType(root, AppBar);

            // Act
            appbar.props.onLeftIconButtonTouchTap();
            
            // Assert
            expect(app.state.drawerOpen).toBe(true);
        });
    });

    describe('when clicking the menu', () => {
        it('should hide the drawer', () => {
            // Arrange
            const appbar = ReactTestUtils.findRenderedComponentWithType(root, AppBar);
            appbar.props.onLeftIconButtonTouchTap();
            const menuItems = ReactTestUtils.scryRenderedComponentsWithType(root, MenuItem);

            // Act
            menuItems[0].props.onTouchTap();
            
            // Assert
            expect(app.state.drawerOpen).toBe(false);
        });
    });
});