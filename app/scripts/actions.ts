import * as redux from 'redux';

import { Action } from './actions';

export interface Action<T> extends redux.Action {
  payload?: T;
  error?: Error
}

export const FAILED_APPLICATION_INFO = 'FAILED_APPLICATION_INFO';
export const FAILED_HISTORICAL_READING = 'FAILED_HISTORICAL_READING';
export const RETRIEVE_APPLICATION_INFO = 'RETRIEVE_APPLICATION_INFO';
export const RETRIEVE_HISTORICAL_READING = 'RETRIEVE_HISTORICAL_READING';
export const RETRIEVED_APPLICATION_INFO = 'RETRIEVED_APPLICATION_INFO';
export const RETRIEVED_HISTORICAL_READING = 'RETRIEVED_HISTORICAL_READING';

import * as api from './api';

const log = (name: string, error: Error) => {
    console.error(`An error occurred while ${name}: ${error.message}`);
}

export const retrieveApplicationInfo = () => {
    return async (dispatch: redux.Dispatch<Action<any>>, getState: () => any) => {
        try {
            dispatch({ type: RETRIEVE_APPLICATION_INFO });
            const info = await api.retrieveApplicationInfo();
            dispatch({ type: RETRIEVED_APPLICATION_INFO, payload: info });
        } catch (error) {
            log('retrieving application info', error);
            dispatch({ type: FAILED_APPLICATION_INFO, error });
        }
    };
};

export const retrieveHistoricalReadings = (searchDate: Date) => {
    return async (dispatch: redux.Dispatch<Action<any>>, getState: () => any) => {
        try {
            dispatch({ type: RETRIEVE_HISTORICAL_READING });
            const reading = await api.retrieveHistoricalReadings(searchDate);
            dispatch({ type: RETRIEVED_HISTORICAL_READING, payload: reading });
        } catch (error) {
            log('retrieving historical readings', error);
            dispatch({ type: FAILED_HISTORICAL_READING, error });
        }
    };
}