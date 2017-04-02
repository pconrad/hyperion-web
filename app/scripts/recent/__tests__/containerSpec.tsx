import * as React from 'react';
import { shallow } from 'enzyme';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const retrieveRecentReadings = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveRecentReadings }));

import RecentContainer from '../container'
import View from '../view';

describe('<RecentContainer />', () => {
    afterEach(() => {
        retrieveRecentReadings.mockReset();
    });

    it('should show loading indicator while loading', () => {
        // Arrange
        retrieveRecentReadings.mockImplementation(() => Promise.resolve());

        // Act
        const container = shallow(<RecentContainer />);

        // Assert
        expect(container.find(LinearProgress).exists()).toBe(true);
    });

    it('should show error when one occurs', (done) => {
        // Arrange
        const error = new Error('Ahw, an error');
        retrieveRecentReadings.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<RecentContainer />);
        
        // Assert
        setTimeout(() => {
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(true);
            expect(container.find(Snackbar).props().message).toMatch(error.message);
            done();
        }, 250);
    });
    
    it('should show data when fetched', (done) => {
        // Arrange
        const result = [{}, {}];
        retrieveRecentReadings.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<RecentContainer />);
        
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