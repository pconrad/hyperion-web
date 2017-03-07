import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';

import { retrieveApplicationInfo } from '../actions'
import { About } from '../presentations/about'
import { ApplicationInfo } from '../model';

interface Props {
    applicationInfo?: ApplicationInfo,
    error?: Error,
    loading: boolean,
    retrieveData: () => void
}

export class AboutContainer extends React.Component<Props, {}> {
    componentWillMount() {
        this.props.loading || this.props.retrieveData();
    }

    render() {
        const { applicationInfo, error, loading, retrieveData } = this.props;
        return (<div>
            <h1>About Υπερίων</h1>
            { loading         && <LinearProgress /> }
            { error           && <Snackbar autoHideDuration={ 2000 } action="retry" message={ error.message } onActionTouchTap={ retrieveData } open={ !!error } /> }
            { applicationInfo && <About data={ this.props.applicationInfo } /> }
        </div>);
    }
}

const mapStateToProps = (state) => ({
    applicationInfo: state.applicationInfo.data as ApplicationInfo,
    error: state.applicationInfo.error as Error,
    loading: state.applicationInfo.loading as boolean
});

const mapDispatchToProps = (dispatch) => ({
    retrieveData: () => dispatch(retrieveApplicationInfo())
});

export default connect<any, any, {}>(mapStateToProps, mapDispatchToProps)(AboutContainer);