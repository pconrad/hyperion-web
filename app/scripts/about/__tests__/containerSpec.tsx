import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils'

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider } from 'material-ui/styles';

import { AboutContainer } from '../container'

describe('<AboutContainer />', () => {

    it('should dispatch action to retrieve data', () => {
        // Arrange
        const mock = jest.fn();

        // Act
        ReactTestUtils.renderIntoDocument(<AboutContainer loading={ false } retrieveData={ mock } />);

        // Assert
        expect(mock).toHaveBeenCalled();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        const mock = jest.fn();

        // Act
        const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <AboutContainer loading={ true } retrieveData={ mock } />
        </MuiThemeProvider>);

        // Assert
        const progress: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, LinearProgress);
        expect(progress).toBeDefined();
        expect(mock).not.toHaveBeenCalled();

        expect(ReactTestUtils.scryRenderedComponentsWithType(root as React.Component<any, any>, Snackbar).length).toBe(0);
    });

    it('should show error when one occurs', () => {
        // Arrange
        const error = new Error('Ahw, an error');
        const mock = jest.fn();

        // Act
        const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <AboutContainer error={ error } loading={ false } retrieveData={ mock } />
        </MuiThemeProvider>);
        
        // Assert
        expect(ReactTestUtils.scryRenderedComponentsWithType(root as React.Component<any, any>, LinearProgress).length).toBe(0);

        const snackbar: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, Snackbar);
        expect(snackbar).toBeDefined();
        expect(snackbar.props.message).toBe(error.message);
    });

    it('should retry when tapping the snackbar', () => {
        // Arrange
        const error = new Error('Ahw, an error');
        const mock = jest.fn();
        const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <AboutContainer error={ error } loading={ true } retrieveData={ mock } />
        </MuiThemeProvider>);
        const snackbar: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, Snackbar);

        // Act
        snackbar.props.onActionTouchTap()
        
        // Assert
        expect(mock).toHaveBeenCalled();
    });

});