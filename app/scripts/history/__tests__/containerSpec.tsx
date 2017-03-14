import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils'

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider } from 'material-ui/styles';

import { HistoryContainer } from '../container'

describe('<HistoryContainer />', () => {

    it('should dispatch action to clear any previous data', () => {
        // Arrange
        const mockRetrieve = jest.fn();
        const mockClear = jest.fn();

        // Act
        ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <HistoryContainer clearData={ mockClear } loading={ false } retrieveData={ mockRetrieve } />
        </MuiThemeProvider>);

        // Assert
        expect(mockClear).toHaveBeenCalled();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        const mockRetrieve = jest.fn();
        const mockClear = jest.fn();

        // Act
        const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <HistoryContainer clearData={ mockClear } loading={ true } retrieveData={ mockRetrieve } />
        </MuiThemeProvider>);

        // Assert
        const progress: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, LinearProgress);
        expect(progress).toBeDefined();
        expect(mockRetrieve).not.toHaveBeenCalled();

        expect(ReactTestUtils.scryRenderedComponentsWithType(root as React.Component<any, any>, Snackbar).length).toBe(0);
    });

    it('should show error when one occurs', () => {
        // Arrange
        const error = new Error('Ahw, an error');
        const mockRetrieve = jest.fn();
        const mockClear = jest.fn();

        // Act
        const root = ReactTestUtils.renderIntoDocument(<MuiThemeProvider>
            <HistoryContainer clearData={ mockClear } error={ error } loading={ false } retrieveData={ mockRetrieve } />
        </MuiThemeProvider>);
        
        // Assert
        expect(ReactTestUtils.scryRenderedComponentsWithType(root as React.Component<any, any>, LinearProgress).length).toBe(0);

        const snackbar: React.Component<any, any> = ReactTestUtils.findRenderedComponentWithType(root as React.Component<any, any>, Snackbar);
        expect(snackbar).toBeDefined();
        expect(snackbar.props.message).toBe(error.message);
    });
})