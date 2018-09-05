import * as React from 'react';

import classnames from 'classnames';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';

import asyncComponent from '../../components/AsyncComponent';
import { UsageRecord } from '../../model';
import TableView from './tableView';

const GraphView: React.ComponentType<{ data: UsageRecord[] }> = asyncComponent(() => import('./graphView'));

interface ViewState {
    activeTab: string;
}
export interface ViewProps {
    data: UsageRecord[];
}

const graph = 'graph';
const table = 'table';
interface Tab {
    id: string;
    label: string;
}
const tabs = [
    { id: table, label: 'Table' },
    { id: graph, label: 'Graph' },
];

class MonthlyUsageView extends React.Component<ViewProps, ViewState> {
    constructor(props: ViewProps) {
        super(props);
        this.state = {
            activeTab: 'table',
        };
    }

    render() {
        return (
            <React.Fragment>
                <Nav tabs={ true }>
                    { tabs.map(this.renderTab) }
                </Nav>
                <TabContent activeTab={ this.state.activeTab }>
                    <TabPane tabId={ table }>
                        <TableView data={ this.props.data } />
                    </TabPane>
                    <TabPane tabId={ graph }>
                        <GraphView data={ this.props.data } />
                    </TabPane>
                </TabContent>
            </React.Fragment>
        );
    }

    private renderTab = (tab: Tab, idx: number) => {
        const className = classnames({ active: this.state.activeTab === tab.id });
        return (
            <NavItem key={ idx }>
                <NavLink className={ className } onClick={ () => this.selectView(tab.id) }>
                    { tab.label }
                </NavLink>
            </NavItem>
        );
    }

    private selectView = (tab: string) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }
}

export default MonthlyUsageView;
