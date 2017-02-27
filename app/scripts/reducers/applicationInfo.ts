import {
    Action,
    FAILED_APPLICATION_INFO,
    RETRIEVE_APPLICATION_INFO,
    RETRIEVED_APPLICATION_INFO
} from '../actions'
import { ApplicationInfo } from '../model/applicationInfo';

const initial: State = {
    data: null,
    error: null,
    loading: false
}

interface State {
    data?: ApplicationInfo
    error?: Error
    loading: boolean
}

export default (state: State = initial, action: Action<ApplicationInfo>): State => {
    switch (action.type) {
        case RETRIEVE_APPLICATION_INFO: {
            return { data: null, error: null, loading: true }
        }
        case RETRIEVED_APPLICATION_INFO: {
            return { data: action.payload, error: null, loading: false };
        }
        case FAILED_APPLICATION_INFO: {
            return { data: null, error: action.error, loading: false }
        }
        default: {
            return state;
        }
    }
}