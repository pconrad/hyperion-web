import * as React from 'react';

import Table, { TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { formatDateTimeFull } from '../dates';
import { LiveReading } from '../model';

export interface ViewProps {
    data: LiveReading;
}

const lowTariff = '0001';

const makeRow = (label: string, value: string) => (
    <TableRow>
        <TableRowColumn>{ label }</TableRowColumn>
        <TableRowColumn>{ value }</TableRowColumn>
    </TableRow>
);

export const View = (props: ViewProps) => {
    const tariff = props.data.tariff === lowTariff ? 'Low' : 'Normal';
    return (
        <Table>
            <TableBody displayRowCheckbox={ false }>
                { makeRow('Timestamp', formatDateTimeFull(props.data.ts)) }
                { makeRow('Current electricity tariff', tariff) }
                { makeRow('Current electricity consumption', `${props.data.elecCon} kWh`) }
                { makeRow('Current electricity production', `${props.data.elecProd} kWh`) }
                { props.data.gas && makeRow('Total gas consumption', `${props.data.gas} m3` ) }
            </TableBody>
        </Table>
    );
};
