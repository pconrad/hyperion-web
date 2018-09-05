import * as React from 'react';

import { shallow } from 'enzyme';
import { Input } from 'reactstrap';

import YearSelector from '../yearSelector';

describe('<YearSelector />', () => {
    it('should pre-select a month', () => {
        // Arrange
        const selectedYear = 2018;

        // Act
        const selector = shallow(<YearSelector selectedYear={ selectedYear } updateSelectedYear={ jest.fn() } />);

        // Assert
        expect(selector.find(Input).first().props().value).toBe(selectedYear.toString());
    });

    it('should invoke the callback when a month is selected', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);

        // Assert
        selector.find(Input).simulate('change', { currentTarget: { value: '2017' } });
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(2017);
            done();
        }, 100);
    });

    it('should refuse non-numeric inputs', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);
        selector.find(Input).simulate('change', { currentTarget: { value: '2017a' } });

        // Assert
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(undefined);
            done();
        }, 100);
    });

    it('should refuse input below 2010', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);
        selector.find(Input).simulate('change', { currentTarget: { value: '2009' } });

        // Assert
        setTimeout(() => {
            selector.update();
            expect(callback).toHaveBeenCalledWith(undefined);
            expect(selector.find(Input).props().invalid).toBe(true);
            done();
        }, 100);
    });

    it('should clear selected value when input is empty', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);

        // Assert
        selector.find(Input).simulate('change', { currentTarget: { value: '' } });
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(undefined);
            done();
        }, 100);
    });
});
