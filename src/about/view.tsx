import * as React from 'react';

import { Table } from 'reactstrap';

import { ApplicationInfo } from '../model';

export interface ViewProps {
    data: ApplicationInfo;
}

const View: React.StatelessComponent<ViewProps> = (props) => (
    <Table borderless={ true } responsive={ true }>
        <tbody>
            <tr>
                <th scope='row'>Application version</th>
                <td>{ props.data.appVersion }</td>
            </tr>
            <tr>
                <th scope='row'>Java runtime</th>
                <td>{ props.data.javaVersion }</td>
            </tr>
            <tr>
                <th scope='row'>Scala version</th>
                <td>{ props.data.scalaVersion }</td>
            </tr>
            <tr>
                <th scope='row'>Operating system</th>
                <td>{ props.data.os }</td>
            </tr>
            <tr>
                <th scope='row'>Database</th>
                <td>{ props.data.database }</td>
            </tr>
            <tr>
                <th scope='row'>Free memory</th>
                <td>{ props.data.freeMem }</td>
            </tr>
            <tr>
                <th scope='row'>Total memory</th>
                <td>{ props.data.totalMem }</td>
            </tr>
        </tbody>
    </Table>
);

export default View;
