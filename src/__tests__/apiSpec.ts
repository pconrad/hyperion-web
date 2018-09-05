import * as fetchMock from 'fetch-mock';

import * as api from '../api';

(fetchMock as any).config.overwriteRoutes = true;

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
                return api.get('/').catch((error: Error) => {
                    // Assert
                    expect(error.message).toBe('HTTP error 404: Not Found');
                });
            });
        });
    });

    describe('with custom error handling', () => {
        describe('when the error code is defined as a string', () => {
            it('should throw the predefined error', () => {
                // Arrange
                const errorMapping = { 500: (response: Response) => Promise.resolve('Something quite bizarre') };
                fetchMock.get('*', 500);

                // Act
                return api.get('/', undefined, errorMapping).catch((error: Error) => {
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
                    return api.get('/').catch((error: Error) => {
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
            const body = JSON.stringify({ hello: 'world' });
            fetchMock.get('*', { status: 200, body });

            // Act
            return api.get('/').then((result) => {
                // Assert
                expect(result).toEqual({ hello: 'world' });
            });
        });
    });
});

describe('retrieveApplicationInfo()', () => {
    it('should invoke /api/info', () => {
        // Arrange
        const body = JSON.stringify({ appVersion: 1 });
        fetchMock.get('/api/info', { status: 200, body });

        // Act
        api.retrieveApplicationInfo().then((result) => {
            // Assert
            expect(result).toEqual({ appVersion: 1 });
        });
    });
});

describe('retrieveHistoricalReadingsForDate()', () => {
    it('should invoke /api/history with date parameter', () => {
        // Arrange
        const body = JSON.stringify({ electricityLow: 15 });
        fetchMock.get('/api/history?date=2014-11-30', { status: 200, body });

        // Act
        const searchDate = new Date(2014, 10, 30);
        return api.retrieveHistoricalReadingForDate(searchDate).then((result) => {
            // Assert
            expect(result).toEqual({ electricityLow: 15 });
        });
    });

    describe('when there is no reading for a given date', () => {
        it('should show a message that there is no reading', () => {
            // Arrange
            const body = 'No record found for date 2014-11-30';
            fetchMock.get('/api/history?date=2014-11-30', { status: 404, body });

            // Assert
            const searchDate = new Date(2014, 10, 30);
            return api.retrieveHistoricalReadingForDate(searchDate).catch((error: Error) => {
                // Act
                expect(error.message).toBe('No record found for selected date');
            });
        });
    });
});

describe('retrieveHistoricalReadingsForMonth()', () => {
    it('should invoke /api/history with month and year parameters', () => {
        // Arrange
        const body = JSON.stringify([{ electricityLow: 15 }]);
        fetchMock.get('/api/history?month=11&year=2014', { status: 200, body });

        // Act
        return api.retrieveHistoricalReadingsForMonth(11, 2014).then((result) => {
            // Assert
            expect(result).toEqual([{ electricityLow: 15 }]);
        });
    });

    describe('when there is no reading for a given month', () => {
        it('should show a message that there is no reading', () => {
            // Arrange
            fetchMock.get('/api/history?month=11&year=2014', { status: 404 });

            // Assert
            return api.retrieveHistoricalReadingsForMonth(11, 2014).catch((error: Error) => {
                // Act
                expect(error.message).toBe('No record found for selected month');
            });
        });
    });
});

describe('retrieveUsageRecordsForMonth()', () => {
    it('should invoke /api/usage with month and year parameters', () => {
        // Arrange
        const body = JSON.stringify([{ electricityLow: 15 }]);
        fetchMock.get('/api/usage?month=11&year=2014', { status: 200, body });

        // Act
        return api.retrieveUsageRecordsForMonth(11, 2014).then((result) => {
            // Assert
            expect(result).toEqual([{ electricityLow: 15 }]);
        });
    });

    describe('when there is no reading for a given month', () => {
        it('should show a message that there is no reading', () => {
            // Arrange
            fetchMock.get('/api/usage?month=11&year=2014', { status: 404 });

            // Assert
            return api.retrieveUsageRecordsForMonth(11, 2014).catch((error: Error) => {
                // Act
                expect(error.message).toBe('No records found for selected month');
            });
        });
    });
});

describe('retrieveRecentReadings()', () => {
    it('should invoke /api/recent', () => {
        // Arrange
        const body = JSON.stringify([{ tariff: '0001' }, { tariff: '0001' }]);
        fetchMock.get('/api/recent', { status: 200, body });

        // Act
        return api.retrieveRecentReadings().then((result) => {
            // Assert
            expect(result).toEqual([{ tariff: '0001' }, { tariff: '0001' }]);
        });
    });
});
