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

    componentWillMount() {
        this.setState({ ...this.state, loading: true });
        retrieveApplicationInfo()
            .then((applicationInfo) => this.setState({ ...this.state, loading: false, applicationInfo }))
            .catch((error) => this.setState({ ...this.state, loading: false, error }));
    }

    render() {
        const { applicationInfo, error, loading } = this.state;
        return (<div>
            <h1>About Υπερίων</h1>
            { loading         && <LinearProgress /> }
            { error           && <Snackbar autoHideDuration={ 2000 }
                                           action='retry'
                                           message={ error.message }
                                           onActionTouchTap={ (e) => this.componentWillMount() }
                                           open={ !!error } /> }
            { applicationInfo && <View data={ applicationInfo } /> }
        </div>);
    }
}

export default AboutContainer;
