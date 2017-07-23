import * as React from 'react'

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { formatTime } from '../dates'
import { RecentReading } from '../model'

export interface ViewProps {
    data: RecentReading[]
}

const label = (reading: RecentReading) => formatTime(reading.ts)

const RecentView = (props: ViewProps) => {
    const data = props.data.map(item => ({ name: label(item), value: item.elecCon * 1000 }));

    return (
        <LineChart data={ data } height={ 350 } width={ 900 }>
            <CartesianGrid />
            <Line type='monotone' dataKey='value' points={ [] } />
            <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
            <XAxis dataKey="name" />
            <YAxis label='Consumed Power' unit='Watt' />
        </LineChart>
    );
};

export default RecentView;