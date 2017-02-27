export interface Action<T>{
  type: string;
  payload?: T;
  error?: Error
}

export const FAILED_APPLICATION_INFO = 'FAILED_APPLICATION_INFO';
export const RETRIEVE_APPLICATION_INFO = 'RETRIEVE_APPLICATION_INFO';
export const RETRIEVED_APPLICATION_INFO = 'RETRIEVED_APPLICATION_INFO';

import ApplicationInfoService from './services/applicationInfoService';

const applicationInfoService = new ApplicationInfoService();

export const retrieveApplicationInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: RETRIEVE_APPLICATION_INFO });
            const info = await applicationInfoService.retrieveApplicationInfo();
            dispatch({ type: RETRIEVED_APPLICATION_INFO, payload: info });
        } catch(error) {
            dispatch({ type: FAILED_APPLICATION_INFO, error });
        }
    };
};