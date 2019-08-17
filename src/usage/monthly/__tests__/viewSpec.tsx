import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';

import MonthlyUsageView from '../view';
import { UsageRecord } from '../../../model';



describe('<MonthlyUsageView />', () => {
    it('should initially render as a table', () => {
        // Arrange
        const data: UsageRecord[] = [];

        // Act
        const view = shallow(<MonthlyUsageView data={ data } />);

        // Assert
        expect(view.find(TabContent).props().activeTab).toBe('table');
    });

    describe('with the navigation tab clicked', () => {
        it('should render as a graph', (done) => {
            // Arrange
            const data: UsageRecord[] = [];
    
            // Act
            const view = shallow(<MonthlyUsageView data={ data } />);
            view.find(NavLink)
                .findWhere(c => c.props().children === 'Graph')
                .simulate('click');
            
            setTimeout(() => {
                // Assert
                expect(view.find(TabContent).props().activeTab).toBe('graph');
                done();
            }, 500);
        });
    });
});