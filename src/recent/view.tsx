import * as React from 'react';

import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { formatTime } from '../dates';
import { RecentReading } from '../model';

export interface ViewProps {
    data: RecentReading[];
}

const label = (reading: RecentReading) => formatTime(reading.ts);

const RecentView: React.StatelessComponent<ViewProps> = (props) => {
    const data = props.data.map((item) => ({ label: label(item), value: item.elecCon * 1000 }));

    return (
        <LineChart data={ data } height={ 350 } width={ 1200 }>
            <CartesianGrid />
            <XAxis dataKey='label' />
            <YAxis interval={ 0 } type='number' unit=' W' />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <Legend />

            <Line name='Power consumption' type='monotone' dataKey='value' />
        </LineChart>
    );
};

export default RecentView;
