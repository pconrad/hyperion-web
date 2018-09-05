import * as React from 'react';

import { shallow } from 'enzyme';

import Footer from '../footer';

describe('<Footer />', () => {
    it('should render', () => {
        // Act
        const wrapper = shallow(<Footer />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
