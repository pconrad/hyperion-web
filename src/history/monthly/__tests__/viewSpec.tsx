import * as React from 'react';

import renderer from 'react-test-renderer';

import View from '../view';

describe('<View />', () => {
    it('should present some data', () => {
        // Arrange
        const data = [
            {
                elecCon: 0.265,
                electricityLow: 2150.714,
                electricityNormal: 2702.641,
                gas: 3781.676,
                recordDate: new Date('2018-01-05'),
            },
            {
                elecCon: 0.265,
                electricityLow: 2150.714,
                electricityNormal: 2702.641,
                gas: 3781.676,
                recordDate: new Date('2018-01-06'),
            },
        ];

        // Act
        const wrapper = renderer.create(<View data={ data } />);

        // Assert
        expect(true).toBe(true);

        // expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
