import * as React from 'react';

import renderer from 'react-test-renderer';

import MonthYearSelector from '../monthYearSelector';

describe('<MonthYearSelector />', () => {
    it('should look acceptable', () => {
        // Act
        const wrapper = renderer.create(
            <MonthYearSelector
                selectedMonth={ 2018 }
                selectedYear={ 1 }
                updateSelectedMonth={ jest.fn() }
                updateSelectedYear={ jest.fn() }
            />,
        );

        // Assert
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
