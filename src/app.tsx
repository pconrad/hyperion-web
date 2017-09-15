import * as React from 'react';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

const style = {
    padding: 19,
};

export interface AppState {
    drawerOpen: boolean;
}

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

                    { this.createMenuItem('Home', '/home' ) }
                    { this.createMenuItem('Live', '/live' ) }
                    { this.createMenuItem('Recent', '/recent' ) }
                    { this.createMenuItem('History', '/history' ) }

                    <Divider />

                    { this.createMenuItem('About', '/about' ) }
                </Drawer>

                <Paper style={ style }>{ this.props.children }</Paper>
            </div>
        );
    }

    private openDrawer = (opening: boolean) => {
        this.setState({ drawerOpen: opening });
    }

    private createMenuItem = (label: string, target: string) => (
        <MenuItem containerElement={ <Link to={ target } /> } label={ label } onTouchTap={ this.handleMenuClick } >{ label }</MenuItem>
    )

    private handleToggle = (e: any) => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    private handleMenuClick = (e: any) => {
        this.setState({ drawerOpen: false });
    }
}
