import * as React from 'react';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { formatDateFull } from '../../dates';
import { Reading } from '../../model';

export interface ViewProps {
    data: Reading;
}

export default (props: ViewProps) => (
    <Table selectable={ false }>
        <TableBody displayRowCheckbox={ false }>
            <TableRow>
                <TableRowColumn>Date recorded</TableRowColumn>
                <TableRowColumn>{ formatDateFull(props.data.recordDate) }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Electricity (low)</TableRowColumn>
                <TableRowColumn>{ props.data.electricityLow } kWh</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Electricity (normal)</TableRowColumn>
                <TableRowColumn>{ props.data.electricityNormal } kWh</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Gas</TableRowColumn>
                <TableRowColumn>{ props.data.gas } m<sup>3</sup></TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
);
