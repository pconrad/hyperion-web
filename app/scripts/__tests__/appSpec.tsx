import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { AppBar, MenuItem } from 'material-ui';

import { App, AppState } from '../app';

describe('<App />', () => {
    const root = renderIntoDocument(<MuiThemeProvider><App /></MuiThemeProvider>);
    const app = findRenderedComponentWithType(root as React.Component<any, any>, App as any);

    describe('when clicking the hamburger', () => {
        it('should show the drawer', () => {
            // Arrange
            const appbar: React.Component<any> = findRenderedComponentWithType(root as React.Component<any>, AppBar);

            // Act
            appbar.props.onLeftIconButtonTouchTap();

            // Assert
            expect((app.state as AppState).drawerOpen).toBe(true);
        });
    });

    describe('when clicking the menu', () => {
        it('should hide the drawer', () => {
            // Arrange
            const appbar: React.Component<any> = findRenderedComponentWithType(root as React.Component<any>, AppBar);
            appbar.props.onLeftIconButtonTouchTap();
            const menuItems: Array<React.Component<any>> = scryRenderedComponentsWithType(root as React.Component<any>, MenuItem);

            // Act
            menuItems[0].props.onTouchTap();

            // Assert
            expect((app.state as AppState).drawerOpen).toBe(false);
        });
    });
});
