import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

jest.mock('../../../api');

import { SingleDatePicker } from 'react-dates';
import { Progress } from 'reactstrap';

import { retrieveHistoricalReadingForDate } from '../../../api';
import DailyHistoryContainer from '../container';

describe('<DailyHistoryContainer />', () => {
    afterEach(() => {
        (retrieveHistoricalReadingForDate as jest.Mock).mockReset();
    });

    it('should show a date selector', () => {
        // Arrange

        // Act
        const container = shallow(<DailyHistoryContainer />);

        // Assert
        expect(container.find(SingleDatePicker).exists()).toBe(true);
        expect((retrieveHistoricalReadingForDate as jest.Mock)).not.toHaveBeenCalled();
        expect(container.find(Progress).exists()).toBe(false);
    });

    it('should retrieve reading for selected date', (done) => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days');
        const result = {};
        (retrieveHistoricalReadingForDate as jest.Mock).mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<DailyHistoryContainer />);
        container.find(SingleDatePicker).props().onDateChange(selectedDate);

        // Assert
        setTimeout(() => {
            expect((retrieveHistoricalReadingForDate as jest.Mock)).toHaveBeenCalledWith(selectedDate.toDate());
            done();
        }, 100);
    });
});
