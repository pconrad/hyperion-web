import * as React from 'react';
import { AppBar, Divider, Drawer, MenuItem, Paper } from 'material-ui';
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
                    <MenuItem
                        containerElement={ <Link to="/live" /> }
                        label="Live"
                        onTouchTap={ (e) => this.handleMenuClick(e) }>Live</MenuItem>
                    <MenuItem
                        containerElement={ <Link to="/recent" /> }
                        label="Recent"
                        onTouchTap={ (e) => this.handleMenuClick(e) }>Recent</MenuItem>
                    <MenuItem
                        containerElement={ <Link to="/history" /> }
                        label="History"
                        onTouchTap={ (e) => this.handleMenuClick(e) }>History</MenuItem>
                    <Divider />
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
