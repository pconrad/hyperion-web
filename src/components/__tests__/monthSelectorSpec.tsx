import * as React from 'react';

import { Input } from 'reactstrap';

import { shallow, ShallowWrapper } from 'enzyme';

import MonthSelector from '../monthSelector';

describe('<MonthSelector />', () => {
    const isRegularOption = (elem: ShallowWrapper<any, any>) => {
        return elem.type() === 'option' && elem.props().disabled === undefined;
    };

    it('should display twelve months', () => {
        // Arrange

        // Act
        const selector = shallow(<MonthSelector selectedMonth={ 3 } updateSelectedMonth={ jest.fn() } />);

        // Assert
        const options = selector.find('option');
        expect(options.find({disabled: true}).length).toBe(1);
        expect(options.findWhere(isRegularOption).length).toBe(12);
    });

    it('should invoke the callback when a month is selected', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<MonthSelector updateSelectedMonth={ callback } />);
        const input = selector.find(Input);
        input.simulate('change', { currentTarget: { value: '3' } });

        // Assert
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(3);
            done();
        }, 100);
    });
});
