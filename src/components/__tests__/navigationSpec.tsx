import * as React from 'react';
import { MemoryRouter } from 'react-router'

import renderer from 'react-test-renderer';

import Navigation from '../navigation';

describe('<Navigation />', () => {
    it('should show menu bar', () => {
        // Act
        const wrapper = renderer.create(<MemoryRouter><Navigation /></MemoryRouter>);

        // Assert
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
