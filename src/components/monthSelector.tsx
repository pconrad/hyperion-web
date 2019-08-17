import * as React from 'react';

import {
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

interface MonthSelectorProps {
    selectedMonth?: number;
    updateSelectedMonth: (selectedMonth: number) => void;
}

class MonthSelector extends React.Component<MonthSelectorProps, {}> {
    render() {
        return (
            <FormGroup row={ true }>
                <Label for='month'>Month</Label>
                <Input type='select' id='month' defaultValue='initial' onChange={ this.callback }>
                    <option disabled={ true } value='initial'>---</option>
                    { months.map(this.createMonth) }
                </Input>
            </FormGroup>
        );
    }

    private callback = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.props.updateSelectedMonth(Number(value));
    }

    private createMonth = (month: string, idx: number) => {
        return <option key={ idx } value={ idx + 1 }>{ month }</option>;
    }
}

export default MonthSelector;
