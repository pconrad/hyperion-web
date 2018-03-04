import * as React from 'react';

import { shallow } from 'enzyme';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import MonthSelector from '../monthSelector';

describe('<MonthSelector />', () => {
    it('should display twelve months', () => {
        // Arrange

        // Act
        const selector = shallow(<MonthSelector selectedMonth={ 3 } updateSelectedMonth={ jest.fn() } />);

        // Assert
        expect(selector.find(MenuItem).length).toBe(12);
    });

    it('should pre-select a month', () => {
        // Arrange
        const selectedMonth = 3;

        // Act
        const selector = shallow(<MonthSelector selectedMonth={ selectedMonth } updateSelectedMonth={ jest.fn() } />);

        // Assert
        expect(selector.find(MenuItem).at(selectedMonth - 1).props().checked).toBe(true);
    });

    it('should invoke the callback when a month is selected', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<MonthSelector updateSelectedMonth={ callback } />);

        // Assert
        selector.find(SelectField).simulate('change', null, 2, 3);
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(3);
            done();
        }, 100);
    });
});
