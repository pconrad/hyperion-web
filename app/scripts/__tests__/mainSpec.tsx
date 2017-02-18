import * as React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Main } from '../main';

describe('<Main />', () => {
    it('should render application components', () => {
        // Act
        const main = shallow(<Main />);

        // Assert
        expect(main).toMatchSnapshot();
    });
});