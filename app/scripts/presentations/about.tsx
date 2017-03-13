import * as React from 'react'

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { ApplicationInfo } from '../model';

export interface AboutProps {
    data: ApplicationInfo
}

export const AboutView = (props: AboutProps) => (
    <Table>
        <TableBody displayRowCheckbox={ false }>
            <TableRow>
                <TableRowColumn>Application version</TableRowColumn>
                <TableRowColumn>{ props.data.appVersion }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Java runtime</TableRowColumn>
                <TableRowColumn>{ props.data.javaVersion }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Scala version</TableRowColumn>
                <TableRowColumn>{ props.data.scalaVersion }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Operating system</TableRowColumn>
                <TableRowColumn>{ props.data.os }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Database</TableRowColumn>
                <TableRowColumn>{ props.data.database }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Free memory</TableRowColumn>
                <TableRowColumn>{ props.data.freeMem }</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Total memory</TableRowColumn>
                <TableRowColumn>{ props.data.totalMem }</TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
);
