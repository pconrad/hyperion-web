import { shallow } from 'enzyme';
import * as React from 'react';

const mockRetrieveApplicationInfo = jest.fn(() => Promise.resolve());
jest.mock('../../api', () => ({ retrieveApplicationInfo: mockRetrieveApplicationInfo }));

import AboutContainer from '../container';

describe('<AboutContainer />', () => {
    afterEach(() => {
        mockRetrieveApplicationInfo.mockReset();
    });

    it('should retrieve application info', () => {
        // Arrange
        mockRetrieveApplicationInfo.mockImplementation(() => Promise.resolve());

        // Act
        shallow(<AboutContainer />);

        // Assert
        expect(mockRetrieveApplicationInfo).toHaveBeenCalled();
    });
});
