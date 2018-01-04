import { shallow } from 'enzyme';
import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const mockRetrieveRecentReadings = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveRecentReadings: mockRetrieveRecentReadings }));

import RecentContainer from '../container';
import View from '../view';

describe('<RecentContainer />', () => {
    afterEach(() => {
        mockRetrieveRecentReadings.mockReset();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        mockRetrieveRecentReadings.mockImplementation(() => Promise.resolve());

        // Act
        const container = shallow(<RecentContainer />);

        // Assert
        expect(container.find(LinearProgress).exists()).toBe(true);
    });

    it('should show error when one occurs', (done) => {
        // Arrange
        const error = new Error('Ahw, an error');
        mockRetrieveRecentReadings.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<RecentContainer />);

        // Assert
        setTimeout(() => {
            container.update();
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(true);
            expect(container.find(Snackbar).props().message).toMatch(error.message);
            done();
        }, 250);
    });

    it('should show data when fetched', (done) => {
        // Arrange
        const result = [{}, {}];
        mockRetrieveRecentReadings.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<RecentContainer />);

        // Assert
        setTimeout(() => {
            container.update();
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(false);
            expect(container.find(View).exists()).toBe(true);
            expect(container.find(View).props().data).toBe(result);
            done();
        }, 250);
    });
});
