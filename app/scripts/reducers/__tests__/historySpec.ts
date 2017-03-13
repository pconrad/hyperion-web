import reducer from '../index';

import {
    CLEAR_HISTORICAL_READING,
    FAILED_HISTORICAL_READING,
    RETRIEVE_HISTORICAL_READING,
    RETRIEVED_HISTORICAL_READING
} from '../../actions';

describe('History reducers', () => {
    const initialState = { applicationInfo: {} };

    it('should clear historical readings', () => {
        // Arrange
        const action = { type: CLEAR_HISTORICAL_READING };

        // Act
        const state = reducer({ history: { data: 'foo' }}, action);

        // Assert
        expect(state.history.data).toBeUndefined();
    });

    it('should register the date that was entered', () => {
        // Arrange
        const payload = new Date();
        const action = { type: RETRIEVE_HISTORICAL_READING, payload };

        // Act
        const state = reducer(initialState, action);

        // Assert
        expect(state.history.loading).toBe(true);
        expect(state.history.searchDate).toBe(payload);
        expect(state.history.error).toBeUndefined();
    });

    it('should register succes', () => {
        // Arrange
        const payload = {};
        const action = { type: RETRIEVED_HISTORICAL_READING, payload };

        // Act
        const state = reducer(initialState, action);

        // Assert
        expect(state.history.loading).toBe(false);
        expect(state.history.data).toEqual(payload);
        expect(state.history.error).toBeUndefined();
    });

    it('should register failures', () => {
        // Arrange
        const error = new Error();
        const action = { type: FAILED_HISTORICAL_READING, error };

        // Act
        const state = reducer(initialState, action);

        // Assert
        expect(state.history.loading).toBe(false);
        expect(state.history.data).toBeUndefined();
        expect(state.history.error).toEqual(error);
    });
});