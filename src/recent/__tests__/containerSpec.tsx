import { shallow } from 'enzyme';
import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';

const mockRetrieveRecentReadings = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveRecentReadings: mockRetrieveRecentReadings }));

import RecentContainer from '../container';

describe('<RecentContainer />', () => {
    afterEach(() => {
        mockRetrieveRecentReadings.mockReset();
    });

    it('should retrieve recent readings', () => {
        // Arrange
        mockRetrieveRecentReadings.mockImplementation(() => Promise.resolve([]));

        // Act
        shallow(<RecentContainer />);

        // Assert
        expect(mockRetrieveRecentReadings).toHaveBeenCalled();
    });

    xit('should retry when tapping the snackbar', () => {
        // Arrange
        const error = new Error('Ahw, an error');
        mockRetrieveRecentReadings.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<RecentContainer />);
        container.setState({ ...container.state(), error });
        const snackbarProps = container.find(Snackbar).props();
        if (snackbarProps.onActionClick) {
            snackbarProps.onActionClick(undefined as any);
        }

        // Assert
        expect(mockRetrieveRecentReadings).toHaveBeenCalledTimes(2);
    });
});
