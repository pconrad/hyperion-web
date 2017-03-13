/// <reference types="whatwg-fetch" />

import { ApplicationInfo } from './model';
import { Reading } from './model';
import { formatDateBackend } from './dates';

interface ErrorMapping {
    [key: number]: string
}

const defaultOptions: RequestInit = {
    credentials: 'same-origin'
}

const checkStatus = (response: Response, errorMapping: ErrorMapping): Response => {
    const status = response.status;
    if (errorMapping[status]) {
        throw new Error(errorMapping[status]);
    } else if (status >= 200 && status < 300) {
        return response
    } else {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
}

const parseJSON = (response: Response): any => {
  return response.json()
}

// Exported only so that it can be tested.
export const get = (input: RequestInfo, init?: RequestInit, errorMapping: ErrorMapping = {}): Promise<any> => {
    const options = { ...defaultOptions, init}
    return fetch(input, options)
        .then(res => checkStatus(res, errorMapping))
        .then(parseJSON);
}

export const retrieveApplicationInfo = (): Promise<ApplicationInfo> => {
    return get('/api/info');
};

export const retrieveHistoricalReadings = (searchDate: Date): Promise<Reading> => {
    const errorMapping: ErrorMapping = {
        404: 'No record found for selected date'
    };
    const input = formatDateBackend(searchDate);
    return get(`/api/history?date=${input}`, undefined, errorMapping);
};