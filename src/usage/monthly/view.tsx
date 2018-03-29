import * as React from 'react';

import { Tab, Tabs } from 'material-ui/Tabs';

import asyncComponent from '../../components/AsyncComponent';
import { UsageRecord } from '../../model';
import TableView from './tableView';

const GraphView: React.ComponentType<{ data: UsageRecord[] }> = asyncComponent(() => import('./graphView'));

export interface ViewProps {
    data: UsageRecord[];
}

const MonthlyUsageView: React.StatelessComponent<ViewProps> = (props) => (
    <Tabs>
        <Tab label='Table'>
            <br />
            <TableView data={ props.data } />
        </Tab>
        <Tab label='Graph'>
            <br />
            <GraphView data={ props.data } />
        </Tab>
    </Tabs>
);

export default MonthlyUsageView;
