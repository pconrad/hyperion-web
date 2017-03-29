import * as React from 'react';
import { shallow } from 'enzyme';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const retrieveApplicationInfo = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveApplicationInfo }));

import AboutContainer from '../container'
import View from '../view';

describe('<AboutContainer />', () => {
    afterEach(() => {
        retrieveApplicationInfo.mockReset();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        retrieveApplicationInfo.mockImplementation(() => Promise.resolve());

        // Act
        const container = shallow(<AboutContainer />);

        // Assert
        expect(container.find(LinearProgress).exists()).toBe(true);
        expect(retrieveApplicationInfo).toHaveBeenCalled();
    });

    it('should show error when one occurs', (done) => {
        // Arrange
        const error = new Error('Ahw, an error');
        retrieveApplicationInfo.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<AboutContainer />);
        
        // Assert
        setTimeout(() => {
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(true);
            expect(container.find(Snackbar).props().message).toMatch(error.message);
            done();
        }, 250);
    });

    it('should retry when tapping the snackbar', () => {
        // Arrange
        const error = new Error('Ahw, an error');
        retrieveApplicationInfo.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<AboutContainer />);
        container.setState({ ...container.state(), error });
        const snackbarProps = container.find(Snackbar).props();
        snackbarProps.onActionTouchTap && snackbarProps.onActionTouchTap(undefined as any);
        
        // Assert
        expect(retrieveApplicationInfo).toHaveBeenCalledTimes(2);
    });

    it('should show data when fetched', (done) => {
        // Arrange
        const result = {};
        retrieveApplicationInfo.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<AboutContainer />);
        
        // Assert
        setTimeout(() => {
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(false);
            expect(container.find(View).exists()).toBe(true);
            expect(container.find(View).props().data).toBe(result);
            done();
        }, 250);
    });

});