import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import * as React from 'react';
import { Link } from 'react-router';

const style = {
    padding: 19
}

export interface AppState {
    drawerOpen: boolean
}

export class App extends React.Component<void, AppState> {
    constructor(props: void) {
        super(props);
        this.state = { drawerOpen: false };
    }

    private handleToggle(e: any) {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    private handleMenuClick(e: any) {
        this.setState({ drawerOpen: false });
    }

    render() {
        return (
            <div>
                <AppBar title={ 'Υπερίων' } onLeftIconButtonTouchTap={ e => this.handleToggle(e) } />
                <Drawer
                    docked={ false }
                    onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }
                    open={ this.state.drawerOpen } >
                    <MenuItem
                        containerElement={ <Link to="/home" /> }
                        label="Home"
                        onTouchTap={ (e) => this.handleMenuClick(e) }>Home</MenuItem>
                    <MenuItem>Live</MenuItem>
                    <MenuItem>Recent</MenuItem>
                    <MenuItem>History</MenuItem>
                    <MenuItem
                        containerElement={ <Link to="/about" /> }
                        label="About"
                        onTouchTap={ (e) => this.handleMenuClick(e) }>About</MenuItem>
                </Drawer>
                <Paper style={ style }>
                    { this.props.children }
                </Paper>
            </div>
        );
    }
}