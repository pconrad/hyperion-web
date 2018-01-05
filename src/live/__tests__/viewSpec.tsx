import * as React from 'react';

import { shallow } from 'enzyme';

import View from '../view';

describe('<View />', () => {
    it('should present some data', () => {
        // Arrange
        const data = {
            elecCon: 0.265,
            elecProd: 0.000,
            gas: 3781.676,
            tariff: '0002',
            ts: '2018-01-05T15:40:47+01:00',
        };

        // Act
        const wrapper = shallow(<View data={ data } />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});