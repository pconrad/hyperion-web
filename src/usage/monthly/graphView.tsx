import * as React from 'react';

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { formatDateMedium } from '../../dates';
import { UsageRecord } from '../../model';

export interface ViewProps {
    data: UsageRecord[];
}

const label = (reading: UsageRecord) => formatDateMedium(reading.date);

const electricityData = (data: UsageRecord[]) => data.map((item) => ({
    date: label(item),
    electricityLow: item.electricityLow * 1000,
    electricityNormal: item.electricityNormal * 1000,
    totalElectricity: Math.max(item.electricityLow, item.electricityNormal) * 1000,
}));

const gasData = (data: UsageRecord[]) => data.map((item) => ({
    date: label(item),
    gas: item.gas,
}));

export const MonthlyUsageGraphView: React.StatelessComponent<ViewProps> = (props) => (
    <React.Fragment>
        <h2>Electricity</h2>
        <BarChart data={ electricityData(props.data) } height={ 350 } width={ 900 }>
            <CartesianGrid />
            <XAxis dataKey='date' />
            <YAxis interval={ 0 } unit=' kWh' type='number' />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <Legend />

            <Bar dataKey='electricityLow'    fill='#00bcd4' name='Electricity (low tariff)' />
            <Bar dataKey='electricityNormal' fill='#0097a7' name='Electricity (normal tariff)' />
        </BarChart>

        <h2>Gas</h2>
        <BarChart data={ gasData(props.data) } height={ 350 } width={ 900 }>
            <CartesianGrid />
            <XAxis dataKey='date' />
            <YAxis interval={ 0 } unit=' m3' type='number' />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <Legend />

            <Bar dataKey='gas' name='Gas' fill='#00bcd4' />
        </BarChart>
    </React.Fragment>
);

export default MonthlyUsageGraphView;
