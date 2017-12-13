import { shallow } from 'enzyme';
import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const mockRetrieveApplicationInfo = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveApplicationInfo: mockRetrieveApplicationInfo }));

import AboutContainer from '../container';
import View from '../view';

describe('<AboutContainer />', () => {
    afterEach(() => {
        mockRetrieveApplicationInfo.mockReset();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        mockRetrieveApplicationInfo.mockImplementation(() => Promise.resolve());

        // Act
        const container = shallow(<AboutContainer />);

        // Assert
        expect(container.find(LinearProgress).exists()).toBe(true);
        expect(mockRetrieveApplicationInfo).toHaveBeenCalled();
    });

    it('should show error when one occurs', (done) => {
        // Arrange
        const error = new Error('Ahw, an error');
        mockRetrieveApplicationInfo.mockImplementation(() => Promise.reject(error));

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
        mockRetrieveApplicationInfo.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<AboutContainer />);
        container.setState({ ...container.state(), error });
        const snackbarProps = container.find(Snackbar).props();
        if (snackbarProps.onActionClick) {
            snackbarProps.onActionClick(undefined as any);
        }

        // Assert
        expect(mockRetrieveApplicationInfo).toHaveBeenCalledTimes(2);
    });

    it('should show data when fetched', (done) => {
        // Arrange
        const result = {};
        mockRetrieveApplicationInfo.mockImplementation(() => Promise.resolve(result));

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
