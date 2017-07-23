import * as moment from 'moment';

import * as dates from '../dates';

describe('Date-related functions', () => {
    const input = new Date(2012, 11, 20, 3, 15, 42);

    describe('formatDateShort()', () => {
        it('should properly format', () => {
            // Act
            const result = dates.formatDateShort(input);

            // Assert
            expect(result).toBe('20 Dec 2012');
        });
    });

    describe('formatDateBackend()', () => {
        it('should properly format', () => {
            // Act
            const result = dates.formatDateBackend(input);

            // Assert
            expect(result).toBe('2012-12-20');
        });
    });

    describe('formatDateFull()', () => {
        it('should properly format', () => {
            // Act
            const result = dates.formatDateFull(input);

            // Assert
            expect(result).toBe('Thursday, December 20th 2012')
        });
    });

    describe('formatDateTimeFull()', () => {
        it('should properly format', () => {
            // Act
            const result = dates.formatDateTimeFull(input);

            // Assert
            expect(result).toBe('Thursday, December 20th 2012, 03:15:42')
        });
    });

    describe('isFutureDate()', () => {
        describe('when value is in the past', () => {
            it('should return false', () => {
                const input: Date = moment().subtract(1, 'minute').toDate();
                expect(dates.isFutureDate(input)).toBe(false);
            });
        });

        describe('when value is in the future', () => {
            it('should return false', () => {
                const input: Date = moment().add(1, 'minute').toDate();
                expect(dates.isFutureDate(input)).toBe(true);
            });
        });

        describe('when value is equal to today', () => {
            it('should return false', () => {
                const input: Date = moment().toDate();
                expect(dates.isFutureDate(input)).toBe(false);
            });
        });
    });

    describe('formatTime()', () => {
        it('should properly format', () => {
            // Act
            const result = dates.formatTime(input);

            // Assert
            expect(result).toBe('03:15:42')
        });
    });
});