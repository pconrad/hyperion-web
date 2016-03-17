const FULL_DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

class FormattingService {
    formatDateFull(input) {
        const date = new Date(input).toLocaleDateString('en-GB', FULL_DATE_OPTIONS);
        return `${date} (GMT)`;
    }

    formatNumberPower(input) {
        const value = input.toFixed(3);
        return `${value} kW`;
    }

    formatNumberGas(input) {
        const value = input.toFixed(3);
        return `${value} m3`;
    }
}

export default FormattingService;
