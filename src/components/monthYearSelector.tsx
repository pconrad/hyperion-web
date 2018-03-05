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
    <table>
        <tr>
            <td><MonthSelector selectedMonth={ props.selectedMonth } updateSelectedMonth={ props.updateSelectedMonth } /></td>
            <td><YearSelector selectedYear={ props.selectedYear } updateSelectedYear={ props.updateSelectedYear } /></td>
        </tr>
    </table>
);

export default MonthYearSelector;
