import * as React from 'react';

import { shallow } from 'enzyme';

import View from '../view';

describe('<View />', () => {
    it('should present some data', () => {
        // Arrange
        const data = {
            appVersion: '2.0.2',
            database: 'PostgreSQL 9.3.4',
            freeMem: '11 MB',
            javaVersion: '1.8.0_151 (Oracle Corporation)',
            os: 'Linux 4.1.19+ (32 bits)',
            scalaVersion: '2.12.3',
            totalMem: '32 MB',
        };

        // Act
        const wrapper = shallow(<View data={ data } />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
