import * as React from 'react';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

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
            <Bar dataKey='electricityLow'    fill='#00bcd4' name='Electricity (low tariff)' />
            <Bar dataKey='electricityNormal' fill='#0097a7' name='Electricity (normal tariff)' />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <XAxis dataKey='date' />
            <YAxis name='Electricity' unit='kWh' type='number' dataKey='totalElectricity' />
        </BarChart>

        <h2>Gas</h2>
        <BarChart data={ gasData(props.data) } height={ 350 } width={ 900 }>
            <CartesianGrid />
            <Bar dataKey='gas' name={ 'Gas' } fill='#00bcd4' />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <XAxis dataKey='date' />
            <YAxis label='Gas' unit='m3'  type='number' dataKey='gas' />
        </BarChart>
    </React.Fragment>
);

export default MonthlyUsageGraphView;
