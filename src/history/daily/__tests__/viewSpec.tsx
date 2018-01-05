import * as React from 'react';

import { shallow } from 'enzyme';

import View from '../view';

describe('<View />', () => {
    it('should present some data', () => {
        // Arrange
        const data = {
            elecCon: 0.265,
            electricityLow: 2150.714,
            electricityNormal: 2702.641,
            gas: 3781.676,
            recordDate: new Date('2018-01-05'),
        };

        // Act
        const wrapper = shallow(<View data={ data } />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
