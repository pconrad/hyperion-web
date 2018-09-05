import * as React from 'react';

import { shallow } from 'enzyme';

import Start from '../start';

describe('<Start />', () => {
    it('should render', () => {
        // Act
        const wrapper = shallow(<Start />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
