import * as React from 'react'

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui';

import { formatDateTimeFull } from '../dates';
import { LiveReading } from '../model';

export interface ViewProps {
    data: LiveReading
}

const lowTariff = '0001'

export const View = (props: ViewProps) => {
    const tariff = props.data.tariff === lowTariff ? 'Low': 'Normal';
    return (
        <Table>
            <TableBody displayRowCheckbox={ false }>
                <TableRow>
                    <TableRowColumn>Timestamp</TableRowColumn>
                    <TableRowColumn>{ formatDateTimeFull(props.data.ts) }</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>Current electricity tariff</TableRowColumn>
                    <TableRowColumn>{ tariff } </TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>Current electricity consumption</TableRowColumn>
                    <TableRowColumn>{ props.data.elecCon } kWh</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>Current electricity production</TableRowColumn>
                    <TableRowColumn>{ props.data.elecProd } kWh</TableRowColumn>
                </TableRow>
                { props.data.gas && 
                    <TableRow>
                        <TableRowColumn>Total gas consumption</TableRowColumn>
                        <TableRowColumn>{ props.data.gas } m<sup>3</sup></TableRowColumn>
                    </TableRow>
                }
            </TableBody>
        </Table>
    );
};