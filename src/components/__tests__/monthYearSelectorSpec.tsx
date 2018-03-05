import * as React from 'react';

import { shallow } from 'enzyme';

import MonthYearSelector from '../monthYearSelector';

describe('<MonthYearSelector />', () => {
    it('should look acceptable', () => {
        // Act
        const wrapper = shallow(
            <MonthYearSelector
                selectedMonth={ 2018 }
                selectedYear={ 1 }
                updateSelectedMonth={ jest.fn() }
                updateSelectedYear={ jest.fn() }
            />,
        );

        // Assert
        expect(wrapper).toMatchSnapshot();
    });
});
