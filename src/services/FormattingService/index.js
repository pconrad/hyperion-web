const FULL_DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

const SHORT_DATE_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const ONLY_TIME_DATE_OPTIONS = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
};

class FormattingService {
    formatDateShort(input) {
        return new Date(input).toLocaleDateString('en-GB', SHORT_DATE_OPTIONS);
    }

    formatDateOnlyTime(input) {
        return new Date(input).toLocaleTimeString('en-GB', ONLY_TIME_DATE_OPTIONS);
    }

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
