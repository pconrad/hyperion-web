import * as React from 'react';

import { shallow } from 'enzyme';

import Navigation from '../navigation';

describe('<Navigation />', () => {
    it('should show menu bar', () => {
        // Act
        const wrapper = shallow(<Navigation />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
