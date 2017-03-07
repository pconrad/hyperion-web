// <reference types="whatwg-fetch" />

import * as fetchMock from 'fetch-mock';

import { get, retrieveApplicationInfo, retrieveHistoricalReadings } from '../api'

describe('Generic helper functions()', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('when the response status is not in 2xx range', () => {
        it('should throw an error', () => {
            // Arrange
            fetchMock.get('*', 404);

            // Assert
            return get('/').catch((error: Error) => {
                // Act
                expect(error.message).toBe('HTTP error 404: Not Found');
            });
        });
    });

    describe('when the response status is in 2xx range', () => {
        it('should convert the body to JSON', () => {
            // Arrange
            const body = "{ \"hello\": \"world\" }";
            fetchMock.get('*', { status: 200, body });
            
            // Act
            return get('/').then(result => {
                expect(result).toEqual({ hello: 'world' });
            });
        });
    });
});

describe('retrieveApplicationInfo()', () => {
    it('should invoke /api/info', () => {
        // Arrange
        const body = "{ \"appVersion\": 1 }";
        fetchMock.once('/api/info', { status: 200, body }, { method: 'GET' });

        // Act
        retrieveApplicationInfo().then(result => {
            expect(result).toEqual({ appVersion: 1 });
        });
    });
});

describe('retrieveHistoricalReadings()', () => {
    it('should invoke /api/history with parameter', () => {
        // Arrange
        const body = "{ \"electricityLow\": 15 }";
        fetchMock.once('/api/history?date=2014-11-30', { status: 200, body }, { method: 'GET' });

        // Act
        const searchDate = new Date(2014, 10, 30);
        retrieveHistoricalReadings(searchDate).then(result => {
            expect(result).toEqual({ electricityLow: 15 });
        });
    });
});