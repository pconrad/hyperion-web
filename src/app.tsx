import * as React from 'react';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { Link, Route, Switch } from 'react-router-dom';

import AboutContainer from './about/container';
import { Start } from './components/start';
import DailyHistoryContainer from './history/daily/container';
import MonthlyHistoryContainer from './history/monthly/container';
import LiveContainer from './live/container';
import RecentContainer from './recent/container';
import MonthlyUsageContainer from './usage/monthly/container';

const style = {
    padding: 19,
};

export interface AppState {
    drawerOpen: boolean;
}

// tslint:disable-next-line:no-empty
const noop = () => {};

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { drawerOpen: false };
    }

    render() {
        return (
            <React.Fragment>
                <AppBar title={ 'Υπερίων' } onLeftIconButtonClick={ this.handleToggle } />
                <Drawer docked={ false } onRequestChange={ this.openDrawer } open={ this.state.drawerOpen }>

                    { this.createMenuItem('Home', '/') }
                    { this.createMenuItem('Live', '/live') }
                    { this.createMenuItem('Recent', '/recent') }
                    { this.createMenuItemWithChildren('History', this.historyChildren()) }
                    { this.createMenuItemWithChildren('Usage', this.usageChildren()) }

                    <Divider />

                    { this.createMenuItem('About', '/about') }
                </Drawer>

                <Paper style={ style }>
                    <Switch>
                        <Route exact={ true } path='/' component={ Start } />
                        <Route path='/live' component={ LiveContainer } />
                        <Route path='/history/daily' component={ DailyHistoryContainer } />
                        <Route path='/history/monthly' component={ MonthlyHistoryContainer } />
                        <Route path='/recent' component={ RecentContainer } />
                        <Route path='/usage/monthly' component={ MonthlyUsageContainer } />
                        <Route path='/about' component={ AboutContainer } />
                    </Switch>
                </Paper>
            </React.Fragment>
        );
    }

    private openDrawer = (opening: boolean) => {
        this.setState({ drawerOpen: opening });
    }

    private historyChildren = () => ([
        this.createMenuItem('By date', '/history/daily'),
        this.createMenuItem('By month', '/history/monthly'),
    ])

    private usageChildren = () => ([
        this.createMenuItem('By month', '/usage/monthly'),
    ])

    private createMenuItemWithChildren = (label: string, children: JSX.Element[]) => {
        return (
            <MenuItem
                label={ label }
                rightIcon={ <ArrowDropRight /> }
                menuItems={ children }
                onClick={ noop }
            >
                { label }
            </MenuItem>
        );
    }

    private createMenuItem = (label: string, target: string) => {
        return (
            <MenuItem
                containerElement={ <Link to={ target } /> }
                label={ label }
                onClick={ this.handleMenuClick }
            >
                { label }
            </MenuItem>
        );
    }

    private handleToggle = (e: any) => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    private handleMenuClick = (e: any) => {
        this.setState({ drawerOpen: false });
    }
}
