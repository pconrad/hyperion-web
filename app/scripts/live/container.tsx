import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import LinearProgress from 'material-ui/LinearProgress';

import { LiveDataService } from '../api'
import { LiveReading } from '../model';
import { View } from './view'

interface Props {
}

export class LiveContainer extends React.Component<Props, { lastReading?: LiveReading }> {
    private liveDataService = new LiveDataService();

    constructor() {
        super();
        this.state = { };
    }

    componentWillMount() {
        this.liveDataService.connect((data) => this.setState({ lastReading: data }));
    }

    componentWillUnmount() {
        this.liveDataService.disconnect();
    }

    render() {
        const { lastReading } = this.state;
        const loading = !lastReading;
        
        return (<div>
            <h1>Live data</h1>
            { loading     && <LinearProgress /> }
            { lastReading && <View data={ lastReading } /> }
        </div>);
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
});

export default connect<any, any, {}>(mapStateToProps, mapDispatchToProps)(LiveContainer);