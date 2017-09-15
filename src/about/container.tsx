import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { retrieveApplicationInfo } from '../api';
import { ApplicationInfo } from '../model';
import View from './view';

interface State {
    applicationInfo?: ApplicationInfo;
    error?: Error;
    loading: boolean;
}

export class AboutContainer extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = { loading: false };
    }

    componentWillMount() {
        this.setState({ ...this.state, loading: true });
        retrieveApplicationInfo()
            .then((applicationInfo) => this.setState({ ...this.state, loading: false, applicationInfo }))
            .catch((error) => this.setState({ ...this.state, loading: false, error }));
    }

    render() {
        const { applicationInfo, error, loading } = this.state;
        return (
            <div>
                <h1>About Υπερίων</h1>
                { loading && <LinearProgress /> }
                { error && this.showError(error) }
                { applicationInfo && <View data={ applicationInfo } /> }
            </div>
        );
    }

    private showError = (error: Error) => (
        <Snackbar
            autoHideDuration={ 2000 }
            action='retry'
            message={ error.message }
            onActionTouchTap={ this.retry }
            open={ !!error }
        />
    )

    private retry = () => this.componentWillMount();
}

export default AboutContainer;
