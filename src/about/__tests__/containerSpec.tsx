import { shallow } from 'enzyme';
import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';

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

    xit('should retry when tapping the snackbar', () => {
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
});
