/// <reference types="whatwg-fetch" />

import { ApplicationInfo } from './model';
import { Reading } from './model';
import { formatDateBackend } from './dates';

const checkStatus = (response: Response): Response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
}

const parseJSON = (response: Response): any => {
  return response.json()
}

// Exported only so that it can be tested.
export const get = (input: RequestInfo, init?: RequestInit): Promise<any> => {
    return fetch(input, init)
        .then(checkStatus)
        .then(parseJSON);
}

export const retrieveApplicationInfo = (): Promise<ApplicationInfo> => {
    return get('/api/info');
};

export const retrieveHistoricalReadings = (searchDate: Date): Promise<Reading> => {
    const input = formatDateBackend(searchDate);
    return get(`/api/history?date=${input}`);
};