import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

jest.mock('../../../api');

import { retrieveHistoricalReadingsForMonth } from '../../../api';
import MonthYearSelector from '../../../components/monthYearSelector';
import MonthlyHistoryContainer from '../container';

describe('<MonthlyHistoryContainer />', () => {
    afterEach(() => {
        (retrieveHistoricalReadingsForMonth as jest.Mock).mockReset();
    });

    function selectMonth<P, S>(container: ShallowWrapper<P, S>, month: number) {
        const props = container.find(MonthYearSelector).props();
        if (props.updateSelectedMonth) {
            props.updateSelectedMonth(month);
        }
    }

    function selectYear<P, S>(container: ShallowWrapper<P, S>, year: number) {
        const props = container.find(MonthYearSelector).props();
        if (props.updateSelectedYear) {
            props.updateSelectedYear(year);
        }
    }

    it('should show a month selector', () => {
        // Arrange

        // Act
        const container = shallow(<MonthlyHistoryContainer />);

        // Assert
        expect(container.find(MonthYearSelector).exists()).toBe(true);
        expect((retrieveHistoricalReadingsForMonth as jest.Mock)).not.toHaveBeenCalled();
    });

    it('should show a year selector', () => {
        // Arrange

        // Act
        const container = shallow(<MonthlyHistoryContainer />);

        // Assert
        expect(container.find(MonthYearSelector).exists()).toBe(true);
        expect((retrieveHistoricalReadingsForMonth as jest.Mock)).not.toHaveBeenCalled();
    });

    it('should retrieve reading for selected month', (done) => {
        // Arrange
        const result = [{}, {}];
        (retrieveHistoricalReadingsForMonth as jest.Mock).mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<MonthlyHistoryContainer />);
        selectMonth(container, 11);
        selectYear(container, 2014);

        // Assert
        setTimeout(() => {
            expect((retrieveHistoricalReadingsForMonth as jest.Mock)).toHaveBeenCalledWith(11, 2014);
            done();
        }, 100);
    });
});
