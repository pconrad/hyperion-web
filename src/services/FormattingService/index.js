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
        return new Date(input).toLocaleDateString('en-GB', FULL_DATE_OPTIONS);
    }

    formatNumberPower(input) {
        const value = input.toFixed(3);
        return `${value} kW`;
    }
}

export default FormattingService;
