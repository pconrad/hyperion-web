import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import DatePicker from 'material-ui/DatePicker';

import { formatDateShort } from '../dates';

interface Props {
    error?: Error,
    loading: boolean,
    retrieveData: (searchDate: Date) => void,
    searchDate: Date
}

export class HistoryContainer extends React.Component<Props, {}> {
    render() {
        const { searchDate } = this.props;

        return (<div>
            <h1>Retrieve history</h1>
            { searchDate || <DatePicker hintText="Select a date..." container="inline" autoOk={ true } formatDate={ formatDateShort } /> }
        </div>);
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
});

export default connect<any, any, {}>(mapStateToProps, mapDispatchToProps)(HistoryContainer);