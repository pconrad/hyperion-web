import * as redux from 'redux';

export interface Action<T> extends redux.Action {
  payload?: T;
  error?: Error
}

export const FAILED_APPLICATION_INFO = 'FAILED_APPLICATION_INFO';
export const RETRIEVE_APPLICATION_INFO = 'RETRIEVE_APPLICATION_INFO';
export const RETRIEVED_APPLICATION_INFO = 'RETRIEVED_APPLICATION_INFO';

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
