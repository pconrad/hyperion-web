import { shallow, ShallowWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';

import DatePicker from 'material-ui/DatePicker';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const mockRetrieveHistoricalReadings = jest.fn(() => Promise.resolve());
jest.mock('../../../api', () => ({ retrieveHistoricalReadings: mockRetrieveHistoricalReadings }));

import HistoryContainer from '../container';
import View from '../view';

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

    it('should show loading indicator while loading', () => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days').toDate();
        mockRetrieveHistoricalReadings.mockImplementation(() => Promise.resolve());

        // Act
        const container = shallow(<HistoryContainer />);
        selectDate(container, selectedDate);

        // Assert
        container.update();
        expect(container.find(LinearProgress).exists()).toBe(true);
    });

    it('should show error when one occurs', (done) => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days').toDate();
        const error = new Error('Ahw, an error');
        mockRetrieveHistoricalReadings.mockImplementation(() => Promise.reject(error));

        // Act
        const container = shallow(<HistoryContainer />);
        selectDate(container, selectedDate);

        // Assert
        setTimeout(() => {
            container.update();
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(true);
            expect(container.find(Snackbar).props().message).toMatch(error.message);
            done();
        }, 250);
    });

    it('should show data when fetched', (done) => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days').toDate();
        const result = {};
        mockRetrieveHistoricalReadings.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<HistoryContainer />);
        selectDate(container, selectedDate);

        // Assert
        setTimeout(() => {
            container.update();
            expect(container.find(LinearProgress).exists()).toBe(false);
            expect(container.find(Snackbar).exists()).toBe(false);
            expect(container.find(View).exists()).toBe(true);
            expect(container.find(View).props().data).toBe(result);
            done();
        }, 250);
    });
});
