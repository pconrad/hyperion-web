import * as moment from 'moment';

export const formatDateBackend = (input: Date) => {
    return moment(input).format('YYYY-MM-DD');
}

export const formatDateShort = (input: Date) => {
    return moment(input).format('DD MMM YYYY');
}