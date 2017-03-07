import createStore from '../__mocks__/mockStore';

const mock = jest.fn();
jest.mock('../api', () => {
    return {
        retrieveHistoricalReadings: mock
    }
});

import {
    FAILED_HISTORICAL_READING,
    RETRIEVE_HISTORICAL_READING,
    RETRIEVED_HISTORICAL_READING,
    retrieveHistoricalReadings
} from '../actions';

describe('retrieveHistoricalReadings action', () => {
    const input = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    it('should notify that retrieval has started', (done) => {
        // Arrange
        const store = createStore();

        // Act
        store.dispatch(retrieveHistoricalReadings(input));

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVE_HISTORICAL_READING);
            expect(actions.length).toBe(1);
            done();
        }, 500);
    });

    it('should notify that retrieval has ended', (done) => {
        // Arrange
        const info = { foo: 'bar' };
        const store = createStore();
        mock.mockImplementation(() => Promise.resolve(info));

        // Act
        store.dispatch(retrieveHistoricalReadings(input));

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVED_HISTORICAL_READING);
            expect(actions.length).toBe(1);
            expect(actions[0].payload).toBe(info);
            done();
        }, 500);
    });

    it('should notify that an error has occurred', (done) => {
        // Arrange
        const error = new Error('Bark!');
        mock.mockImplementation(() => {
            throw error;
        });
        const store = createStore();

        // Act
        store.dispatch(retrieveHistoricalReadings(input));

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === FAILED_HISTORICAL_READING);
            expect(actions.length).toBe(1);
            expect(actions[0].error).toBe(error);
            done();
        }, 500);
    });
});
