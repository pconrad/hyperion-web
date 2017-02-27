jest.mock('../services/applicationInfoService');
const mock = jest.fn();
import ApplicationInfoService from '../services/applicationInfoService';
ApplicationInfoService.prototype.retrieveApplicationInfo = mock;

import createStore from './mockStore';

import {
    FAILED_APPLICATION_INFO,
    RETRIEVE_APPLICATION_INFO,
    RETRIEVED_APPLICATION_INFO,
    retrieveApplicationInfo
} from '../actions';

describe('retrieveApplicationInfo action', () => {
    it('should notify that retrieval has started', (done) => {
        // Arrange
        const store = createStore();

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVE_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            done();
        }, 500);
    });

    it('should notify that retrieval has ended', (done) => {
        // Arrange
        const info = {};
        const store = createStore();
        mock.mockImplementation(() => Promise.resolve(info));

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVED_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            expect(actions[0].payload).toBe(info);
            done();
        }, 500);
    });

    it('should notify that an error has occurred', (done) => {
        // Arrange
        const error = new Error('Bark!');
        mock.mockImplementation(() => {
            // console.error('I will bark out!');
            throw error;
        });
        const store = createStore();

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === FAILED_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            expect(actions[0].error).toBe(error);
            done();
        }, 500);
    });
});