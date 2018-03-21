import { shallow } from 'enzyme';
import * as React from 'react';

import { MonthlyUsageGraphView } from '../graphView';

import { BarChart } from 'recharts';

describe('<GraphView />', () => {
    const input = [
        { date: new Date(), electricityNormal: 1, electricityLow: 2, gas: 3 },
    ];

    it('should show two bar charts', () => {
        // Act
        const wrapper = shallow(<MonthlyUsageGraphView data={ input } />);

        // Assert
        expect(wrapper.find(BarChart).length).toBe(2);
    });

    it('the Electricity bar chart should display electricity in kWh', () => {
        // Act
        const wrapper = shallow(<MonthlyUsageGraphView data={ input } />);

        // Assert
        /* tslint:disable:no-string-literal */
        const data = wrapper.find(BarChart).at(0).props()['data'] || {};
        expect(data[0]['electricityLow']).toBe(input[0].electricityLow * 1000);
        expect(data[0]['electricityNormal']).toBe(input[0].electricityNormal * 1000);
        /* tslint:enable */
    });

    it('the Gas bar chart should display electricity in m3', () => {
        // Act
        const wrapper = shallow(<MonthlyUsageGraphView data={ input } />);

        // Assert
        /* tslint:disable:no-string-literal */
        const data = wrapper.find(BarChart).at(1).props()['data'] || {};
        expect(data[0]['gas']).toBe(input[0].gas);
        /* tslint:enable */
    });
});
