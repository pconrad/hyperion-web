import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import DatePicker from 'material-ui/DatePicker';

import { retrieveHistoricalReadings } from '../actions'
import { formatDateFull } from '../dates';
import { Reading } from '../model';
import { ReadingView } from '../presentations/reading';

interface Props {
    error?: Error,
    loading: boolean,
    reading?: Reading,
    retrieveData: (searchDate: Date) => void,
    searchDate?: Date
}

export class HistoryContainer extends React.Component<Props, {}> {
    render() {
        const { error, loading, reading, retrieveData, searchDate } = this.props;

        return (<div>
            <h1>Retrieve history</h1>
            { searchDate || <DatePicker hintText="Select a date..."
                                        container="inline"
                                        autoOk={ true }
                                        formatDate={ formatDateFull }
                                        onChange= { (evt, date) => retrieveData(date) } /> }
            { loading    && <LinearProgress /> }
            { error      && <Snackbar   autoHideDuration={ 2000 }
                                        message={ error.message }
                                        open={ !!error } /> }
            { reading && <ReadingView data={ reading } /> }
        </div>);
    }
}

const mapStateToProps = (state: any) => ({
    error: state.history.error as Error,
    loading: state.history.loading as boolean,
    reading: state.history.data as Reading
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    retrieveData: (searchDate: Date) => dispatch(retrieveHistoricalReadings(searchDate))
});

export default connect<any, any, {}>(mapStateToProps, mapDispatchToProps)(HistoryContainer);