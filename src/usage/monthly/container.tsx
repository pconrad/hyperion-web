import * as React from 'react';

import { retrieveUsageRecordsForMonth } from '../../api';

import MonthYearSelector from '../../components/monthYearSelector';
import { UsageRecord } from '../../model';
import Promised from '../../promised';
import View from './view';

const PromisedMonthlyReadingView = Promised<UsageRecord[]>('data', View);

interface State {
    promise?: Promise<UsageRecord[]>;
    selectedMonth?: number;
    selectedYear?: number;
}

class MonthlyUsageContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        const { promise, selectedMonth, selectedYear } = this.state;

        return (
            <>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <h1>Retrieve usage by month</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-3 col-sm-3 col-md-4 col-lg-4'>
                        <MonthYearSelector
                            selectedMonth={ selectedMonth }
                            selectedYear={ selectedYear }
                            updateSelectedMonth={ this.updateSelectedMonth }
                            updateSelectedYear={ this.updateSelectedYear }
                        />
                    </div>
                    <div className='col-xs-9 col-sm-9 col-md-8 col-lg-8'>
                        { promise && <PromisedMonthlyReadingView promise={ promise } /> }
                    </div>
                </div>
            </>
        );
    }

    private retrieveDataIfNecessary = () => {
        const month = this.state.selectedMonth;
        const year = this.state.selectedYear;

        if (!month || !year) {
            return;
        }

        // First remove the old promise (forcing React to re-render container)...
        this.setState({ promise: undefined }, () => {
            // ... only then to create the new promise (forcing another re-render).
            this.setState({ promise: retrieveUsageRecordsForMonth(month, year) });
        });
    }

    private updateSelectedYear = (selectedYear: number) => {
        this.setState({ selectedYear }, this.retrieveDataIfNecessary);
    }

    private updateSelectedMonth = (selectedMonth: number) => {
        this.setState({ selectedMonth }, this.retrieveDataIfNecessary);
    }
}

export default MonthlyUsageContainer;
