import React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../api');

import { retrieveApplicationInfo } from '../../api';

import AboutContainer from '../container';

describe('<AboutContainer />', () => {
    afterEach(() => {
        (retrieveApplicationInfo as jest.Mock).mockReset();
    });

    it('should retrieve application info', () => {
        // Arrange
        (retrieveApplicationInfo as jest.Mock).mockImplementation(() => Promise.resolve());

        // Act
        shallow(<AboutContainer />);

        // Assert
        expect((retrieveApplicationInfo as jest.Mock)).toHaveBeenCalled();
    });
});
