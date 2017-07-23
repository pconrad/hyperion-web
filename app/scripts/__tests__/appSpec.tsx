import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils'
import { MuiThemeProvider } from 'material-ui/styles';

import { AppBar, MenuItem } from 'material-ui';

import { App, AppState } from '../app';

describe('<App />', () => {
    const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider><App /></MuiThemeProvider>);
    const app = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, App as any);

    describe('when clicking the hamburger', () => {
        it('should show the drawer', () => {
            // Arrange
            const appbar: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, AppBar);

            // Act
            appbar.props.onLeftIconButtonTouchTap();
            
            // Assert
            expect((app.state as AppState).drawerOpen).toBe(true);
        });
    });

    describe('when clicking the menu', () => {
        it('should hide the drawer', () => {
            // Arrange
            const appbar: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, AppBar);
            appbar.props.onLeftIconButtonTouchTap();
            const menuItems: React.Component<any, any>[] = ReactTestUtils.scryRenderedComponentsWithType(root as React.Component<any, any>, MenuItem);

            // Act
            menuItems[0].props.onTouchTap();
            
            // Assert
            expect((app.state as AppState).drawerOpen).toBe(false);
        });
    });
});