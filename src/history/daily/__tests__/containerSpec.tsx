import { shallow, ShallowWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';

import DatePicker from 'material-ui/DatePicker';
import LinearProgress from 'material-ui/LinearProgress';

const mockRetrieveHistoricalReadings = jest.fn(() => Promise.resolve());
jest.mock('../../../api', () => ({ retrieveHistoricalReadings: mockRetrieveHistoricalReadings }));

import HistoryContainer from '../container';

describe('<HistoryContainer />', () => {
    afterEach(() => {
        mockRetrieveHistoricalReadings.mockReset();
    });

    function selectDate<P, S>(container: ShallowWrapper<P, S>, input: Date) {
        const props = container.find(DatePicker).props();
        if (props.onChange) {
            props.onChange(undefined, input);
        }
    }

    it('should show a date selector', () => {
        // Arrange

        // Act
        const container = shallow(<HistoryContainer />);

        // Assert
        expect(container.find(DatePicker).exists()).toBe(true);
        expect(mockRetrieveHistoricalReadings).not.toHaveBeenCalled();
        expect(container.find(LinearProgress).exists()).toBe(false);
    });

    it('should retrieve reading for selected date', (done) => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days').toDate();
        const result = {};
        mockRetrieveHistoricalReadings.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<HistoryContainer />);
        selectDate(container, selectedDate);

        // Assert
        setTimeout(() => {
            expect(mockRetrieveHistoricalReadings).toHaveBeenCalledWith(selectedDate);
            done();
        }, 100);
    });
});
