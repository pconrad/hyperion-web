import * as React from 'react';

import { Table } from 'reactstrap';

import { formatDateFull } from '../../dates';
import { Reading } from '../../model';

export interface ViewProps {
    data: Reading;
}

const DailyReadingView: React.StatelessComponent<ViewProps> = (props) => (
    <Table borderless={ true } responsive={ true }>
        <tbody>
            <tr>
                <th scope='row'>Date recorded</th>
                <td>{ formatDateFull(props.data.recordDate) }</td>
            </tr>
            <tr>
                <th scope='row'>Electricity (low)</th>
                <td>{ props.data.electricityLow } kWh</td>
            </tr>
            <tr>
                <th scope='row'>Electricity (normal)</th>
                <td>{ props.data.electricityNormal } kWh</td>
            </tr>
            <tr>
                <th scope='row'>Gas</th>
                <td>{ props.data.gas } m<sup>3</sup></td>
            </tr>
        </tbody>
    </Table>
);

export default DailyReadingView;
