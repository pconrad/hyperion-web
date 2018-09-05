import * as React from 'react';

import { Table } from 'reactstrap';

import { formatDateShort } from '../../dates';
import { Reading } from '../../model';

export interface ViewProps {
    data: Reading[];
}

const createReadingRow = (reading: Reading, idx: number) => (
    <tr key={ idx }>
        <td>{ formatDateShort(reading.recordDate) }</td>
        <td>{ reading.electricityLow } kWh</td>
        <td>{ reading.electricityNormal } kWh</td>
        <td>{ reading.gas } m<sup>3</sup></td>
    </tr>
);

const MonthlyReadingView: React.StatelessComponent<ViewProps> = (props) => (
    <Table borderless={ true } responsive={ true }>
        <thead>
            <tr>
                <th>Date</th>
                <th>Electricity (low)</th>
                <th>Electricity (normal)</th>
                <th>Gas</th>
            </tr>
        </thead>
        <tbody>
            { props.data.map(createReadingRow)}
        </tbody>
    </Table>
);

export default MonthlyReadingView;
