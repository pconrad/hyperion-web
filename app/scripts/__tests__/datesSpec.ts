import { formatDateBackend, formatDateFull, formatDateTimeFull, formatDateShort } from '../dates';

describe('Date-related functions', () => {
    const input = new Date(2012, 11, 20, 3, 15, 42);

    describe('formatDateShort()', () => {
        it('should properly format', () => {
            // Act
            const result = formatDateShort(input);

            // Assert
            expect(result).toBe('20 Dec 2012');
        });
    });

    describe('formatDateBackend()', () => {
        it('should properly format', () => {
            // Act
            const result = formatDateBackend(input);

            // Assert
            expect(result).toBe('2012-12-20');
        });
    });

    describe('formatDateFull()', () => {
        it('should properly format', () => {
            // Act
            const result = formatDateFull(input);

            // Assert
            expect(result).toBe('Thursday, December 20th 2012')
        });
    });

    describe('formatDateTimeFull()', () => {
        it('should properly format', () => {
            // Act
            const result = formatDateTimeFull(input);

            // Assert
            expect(result).toBe('Thursday, December 20th 2012, 03:15:42')
        });
    });
});