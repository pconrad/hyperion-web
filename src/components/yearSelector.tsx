import * as React from 'react';

import {
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

interface YearSelectorProps {
    selectedYear?: number;
    updateSelectedYear: (selectedYear?: number) => void;
}

interface YearSelectorState {
    error?: string;
    value: string;
}

class YearSelector extends React.Component<YearSelectorProps, YearSelectorState> {
    constructor(props: YearSelectorProps) {
        super(props);
        const value = props.selectedYear ? props.selectedYear.toString() : '';
        this.state = { value };
    }

    render() {
        const { error, value } = this.state;
        const invalid = value === undefined || error !== undefined;
        const valid = value !== '' && error === undefined;
        const state = { invalid, valid, value };

        return (
            <FormGroup row={ true }>
                <Label for='year'>Year</Label>
                <Input type='number' id='year' { ...state } onChange={ this.onChange } onBlur={ this.onBlur } />
                <FormFeedback valid={ state.valid }>{ this.state.error }</FormFeedback>
            </FormGroup>
        );
    }

    private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.valueChanged(e.currentTarget.value);
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.valueChanged(e.currentTarget.value);
    }

    private valueChanged = (value: string) => {
        const hasChanged = this.state.value !== value;
        this.setState({ value });
        const isValid = this.validateValue(value);

        if (hasChanged && isValid) {
            this.props.updateSelectedYear(Number(value));
        } else if (!isValid) {
            this.props.updateSelectedYear(undefined);
        }
    }

    private validateValue = (input: string) => {
        const numeric = Number(input);
        if (Number.isNaN(numeric)) {
            return false;
        }
        const error = this.determineErrorText(numeric);
        this.setState({ error });
        return !error;
    }

    private determineErrorText = (input: number) => {
        if (input < 2010) {
            return 'Please enter a year later than 2010';
        } else {
            return undefined;
        }
    }
}

export default YearSelector;
