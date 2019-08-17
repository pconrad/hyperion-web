import * as React from 'react';

import renderer from 'react-test-renderer';

import Start from '../start';

describe('<Start />', () => {
    it('should render', () => {
        // Act
        const wrapper = renderer.create(<Start />);

        // Assert
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
