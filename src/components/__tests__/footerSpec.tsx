import React from 'react';

import renderer from 'react-test-renderer';

import Footer from '../footer';

describe('<Footer />', () => {
    it('should render', () => {
        // Act
        const wrapper = renderer.create(<Footer />);

        // Assert
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
