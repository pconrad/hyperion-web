import React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../api');

import { retrieveRecentReadings } from '../../api';

import RecentContainer from '../container';

describe('<RecentContainer />', () => {
    afterEach(() => {
        (retrieveRecentReadings as jest.Mock).mockReset();
    });

    it('should retrieve recent readings', () => {
        // Arrange
        (retrieveRecentReadings as jest.Mock).mockImplementation(() => Promise.resolve([]));

        // Act
        shallow(<RecentContainer />);

        // Assert
        expect((retrieveRecentReadings as jest.Mock)).toHaveBeenCalled();
    });
});
