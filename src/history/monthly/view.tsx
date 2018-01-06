import * as React from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { formatDateShort } from '../../dates';
import { Reading } from '../../model';

export interface ViewProps {
    data: Reading[];
}

const createReadingRow = (reading: Reading, idx: number) => (
    <TableRow key={ idx }>
        <TableRowColumn>{ formatDateShort(reading.recordDate) }</TableRowColumn>
        <TableRowColumn>{ reading.electricityLow } kWh</TableRowColumn>
        <TableRowColumn>{ reading.electricityNormal } kWh</TableRowColumn>
        <TableRowColumn>{ reading.gas } m<sup>3</sup></TableRowColumn>
    </TableRow>
);

const MonthlyReadingView: React.StatelessComponent<ViewProps> = (props) => (
    <Table selectable={ false }>
        <TableHeader displaySelectAll={ false }>
            <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Electricity (low)</TableHeaderColumn>
                <TableHeaderColumn>Electricity (normal)</TableHeaderColumn>
                <TableHeaderColumn>Gas</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={ false }>
            { props.data.map(createReadingRow)}
        </TableBody>
    </Table>
);

export default MonthlyReadingView;
