import * as React from 'react';

import { LinearProgress, Snackbar } from 'material-ui';

import { retrieveApplicationInfo } from '../api';
import { ApplicationInfo } from '../model';
import View from './view';

interface Props {
}

interface State {
    applicationInfo?: ApplicationInfo;
    error?: Error;
    loading: boolean;
}

export class AboutContainer extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = { loading: false };
    }

    public componentWillMount() {
        this.setState({ ...this.state, loading: true });
        retrieveApplicationInfo()
            .then((applicationInfo) => this.setState({ ...this.state, loading: false, applicationInfo }))
            .catch((error) => this.setState({ ...this.state, loading: false, error }));
    }

    public render() {
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
