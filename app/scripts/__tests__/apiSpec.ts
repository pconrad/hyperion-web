// <reference types="whatwg-fetch" />

import * as fetchMock from 'fetch-mock';

import { get, retrieveApplicationInfo, retrieveHistoricalReadings } from '../api'

describe('Generic helper functions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('with default error handling', () => {
        describe('when the response status is not in 2xx range', () => {
            it('should throw an error', () => {
                // Arrange
                fetchMock.get('*', 404);

                // Act
                return get('/').catch((error: Error) => {
                    // Assert
                    expect(error.message).toBe('HTTP error 404: Not Found');
                });
            });
        });
    });

    describe('with custom error handling', () => {
        describe('when the error code is defined', () => {
            it('should throw the predefined error', () => {
                // Arrange
                const errorMapping = { 500: 'Something quite bizarre' };
                fetchMock.get('*', 500);

                // Act
                return get('/', undefined, errorMapping).catch((error: Error) => {
                    // Assert
                    expect(error.message).toBe('Something quite bizarre');
                });
            });
        });

        describe('when the error code is not defined', () => {
            describe('when the response status is not in 2xx range', () => {
                it('should throw an error', () => {
                    // Arrange
                    fetchMock.get('*', 401);

                    // Act
                    return get('/').catch((error: Error) => {
                        // Assert
                        expect(error.message).toBe('HTTP error 401: Unauthorized');
                    });
                });
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
                // Assert
                expect(result).toEqual({ hello: 'world' });
            });
        });
    });
});

describe('retrieveApplicationInfo()', () => {
    it('should invoke /api/info', () => {
        // Arrange
        const body = '{ \"appVersion\": 1 }';
        fetchMock.once('/api/info', { status: 200, body }, { method: 'GET' });

        // Act
        retrieveApplicationInfo().then(result => {
            // Assert
            expect(result).toEqual({ appVersion: 1 });
        });
    });
});

describe('retrieveHistoricalReadings()', () => {
    it('should invoke /api/history with parameter', () => {
        // Arrange
        const body = '{ \"electricityLow\": 15 }';
        fetchMock.once('/api/history?date=2014-11-30', { status: 200, body }, { method: 'GET' });

        // Act
        const searchDate = new Date(2014, 10, 30);
        retrieveHistoricalReadings(searchDate).then(result => {
            // Assert
            expect(result).toEqual({ electricityLow: 15 });
        });
    });

    describe('when there is no reading for a given date', () => {
        it('should show a message that there is no reading', () => {
            // Arrange
            const body = 'No record found for date 2014-11-30';
            fetchMock.once('/api/history?date=2014-11-30', { status: 404, body })

            // Assert
            const searchDate = new Date(2014, 10, 30);
            return retrieveHistoricalReadings(searchDate).catch((error: Error) => {
                // Act
                expect(error.message).toBe('No record found for selected date');
            });
        });
    });
});