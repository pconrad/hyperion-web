import * as React from 'react';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { Link } from 'react-router';

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
            <div>
                <AppBar title={ 'Υπερίων' } onLeftIconButtonTouchTap={ this.handleToggle } />
                <Drawer docked={ false } onRequestChange={ this.openDrawer } open={ this.state.drawerOpen }>

                    { this.createMenuItem('Home', '/home') }
                    { this.createMenuItem('Live', '/live') }
                    { this.createMenuItem('Recent', '/recent') }
                    { this.createMenuItemWithChildren('History', '/history', this.historyChildren()) }

                    <Divider />

                    { this.createMenuItem('About', '/about') }
                </Drawer>

                <Paper style={ style }>{ this.props.children }</Paper>
            </div>
        );
    }

    private openDrawer = (opening: boolean) => {
        this.setState({ drawerOpen: opening });
    }

    private historyChildren = () => ([
        this.createMenuItem('By date', '/history/daily'),
    ])

    private createMenuItemWithChildren = (label: string, target: string, children: JSX.Element[]) => {
        return (
            <MenuItem
                containerElement={ <Link to={ target } /> }
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
