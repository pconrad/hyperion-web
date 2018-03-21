import * as React from 'react';

import { shallow } from 'enzyme';

import TableView from '../tableView';

describe('<TableView />', () => {
    it('should present some data', () => {
        // Arrange
        const data = [
            {
                date: new Date('2018-01-05'),
                elecCon: 0.265,
                electricityLow: 2150.714,
                electricityNormal: 2702.641,
                gas: 3781.676,
            },
            {
                date: new Date('2018-01-06'),
                elecCon: 0.265,
                electricityLow: 2150.714,
                electricityNormal: 2702.641,
                gas: 3781.676,
            },
        ];

        // Act
        const wrapper = shallow(<TableView data={ data } />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
