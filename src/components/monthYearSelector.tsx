import * as React from 'react';

import MonthSelector from './monthSelector';
import YearSelector from './yearSelector';

interface MonthYearSelectorProps {
    selectedMonth?: number;
    selectedYear?: number;
    updateSelectedMonth: (selectedMonth: number) => void;
    updateSelectedYear: (selectedYear?: number) => void;
}

const MonthYearSelector = (props: MonthYearSelectorProps) => (
    <>
        <MonthSelector selectedMonth={ props.selectedMonth } updateSelectedMonth={ props.updateSelectedMonth } />
        <br />
        <YearSelector selectedYear={ props.selectedYear } updateSelectedYear={ props.updateSelectedYear } />
    </>
);

export default MonthYearSelector;
