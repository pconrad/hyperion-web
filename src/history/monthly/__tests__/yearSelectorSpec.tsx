import * as React from 'react';

import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';

import YearSelector from '../yearSelector';

describe('<YearSelector />', () => {
    it('should pre-select a month', () => {
        // Arrange
        const selectedYear = 2018;

        // Act
        const selector = shallow(<YearSelector selectedYear={ selectedYear } updateSelectedYear={ jest.fn() } />);

        // Assert
        expect(selector.find(TextField).first().props().value).toBe(selectedYear.toString());
    });

    it('should invoke the callback when a month is selected', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);

        // Assert
        selector.find(TextField).simulate('change', null, '2017');
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

        // Assert
        selector.find(TextField).simulate('change', null, '2017a');
        setTimeout(() => {
            expect(callback).not.toHaveBeenCalled();
            done();
        }, 100);
    });

    it('should clear selected value when input is empty', (done) => {
        // Arrange
        const callback = jest.fn();

        // Act
        const selector = shallow(<YearSelector updateSelectedYear={ callback } />);

        // Assert
        selector.find(TextField).simulate('change', null, '');
        setTimeout(() => {
            expect(callback).toHaveBeenCalledWith(undefined);
            done();
        }, 100);
    });
});