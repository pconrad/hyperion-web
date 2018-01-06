import { formatDateBackend } from './dates';
import { ApplicationInfo, LiveReading, Reading, RecentReading } from './model';

interface ErrorMapping {
    [key: number]: (response: Response) => Promise<string>;
}

const defaultOptions: RequestInit = {
    credentials: 'same-origin',
};

const checkStatus = (response: Response, errorMapping: ErrorMapping): Promise<Response> => {
    const status = response.status;
    if (status >= 200 && status < 300) {
        return Promise.resolve(response);
    } else {
        const mapping = errorMapping[status];
        const message = mapping ? mapping(response) : Promise.resolve(`HTTP error ${response.status}: ${response.statusText}`);
        return new Promise((resolve, reject) => {
            message.then((msg) => reject(new Error(msg)));
        });
    }
};

const parseJSON = (response: Response): any => response.json();

// Exported only so that it can be tested.
export const get = (input: RequestInfo, init?: RequestInit, errorMapping: ErrorMapping = {}): Promise<any> => {
    const options = { ...defaultOptions, ...init };
    return fetch(input, options)
        .then((res) => checkStatus(res, errorMapping))
        .then(parseJSON);
};

export const retrieveApplicationInfo = (): Promise<ApplicationInfo> => get('/api/info');

export const retrieveHistoricalReadingForDate = (searchDate: Date): Promise<Reading> => {
    const errorMapping: ErrorMapping = {
        404: (response) => Promise.resolve('No record found for selected date'),
    };
    const input = formatDateBackend(searchDate);
    return get(`/api/history?date=${input}`, undefined, errorMapping);
};

export const retrieveHistoricalReadingsForMonth = (month: number, year: number): Promise<Reading[]> => {
    const errorMapping: ErrorMapping = {
        404: (response) => Promise.resolve('No record found for selected month'),
    };
    return get(`/api/history?month=${month}&year=${year}`, undefined, errorMapping);
};

export const retrieveRecentReadings = (): Promise<RecentReading[]> => get('/api/recent');

export class LiveDataService {
    private ws: WebSocket;

    constructor() {
        const hostname = document.location.hostname;
        const port = document.location.port;
        const protocol = document.location.protocol === 'http:' ? 'ws' : 'wss';
        const address = `${protocol}://${hostname}:${port}/api/actual`;
        this.ws = new WebSocket(address);
    }

    connect(callback: (reading: LiveReading) => void) {
        this.ws.onmessage = (event: MessageEvent) => callback(JSON.parse(event.data));
    }

    disconnect() {
        this.ws.close();
    }
}
