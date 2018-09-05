import { shallow } from 'enzyme';
import * as React from 'react';

import { Progress } from 'reactstrap';

import { LiveReading } from '../../model';
import View from '../view';

const mock = jest.fn();
jest.mock('../../api', () => ({
    LiveDataService: class LiveDataService {
        connect = mock;
    },
}));

import LiveContainer from '../container';

describe('<LiveContainer />', () => {
    beforeEach(() => {
        mock.mockClear();
    });

    describe('when loading', () => {
        it('should show loading indicator', () => {
            // Arrange

            // Act
            const container = shallow(<LiveContainer />);

            // Assert
            expect(container.find(Progress).exists()).toBe(true);
            expect(container.find(View).length).toBe(0);
        });
    });

    describe('when data is available', () => {
        it('should show data', () => {
            // Arrange
            mock.mockImplementation((callback: (data: LiveReading) => void) => {
                callback({ elecCon: 0, elecProd: 0, gas: 0, tariff: '0001', ts: new Date().toISOString() });
            });

            // Act
            const container = shallow(<LiveContainer />);

            // Assert
            expect(container.find(Progress).exists()).toBe(false);
            expect(container.find(View).length).toBe(1);
        });
    });

});
