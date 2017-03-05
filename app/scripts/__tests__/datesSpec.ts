import { formatDateBackend, formatDateShort } from '../dates';

describe('Date-related functions', () => {
    const input = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

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
});