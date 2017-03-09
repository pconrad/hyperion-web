import {
    Action,
    FAILED_APPLICATION_INFO,
    RETRIEVE_APPLICATION_INFO,
    RETRIEVED_APPLICATION_INFO
} from '../actions'
import { ApplicationInfo } from '../model';

interface State {
    data?: ApplicationInfo
    error?: Error
    loading: boolean
}

const initial: State = {
    data: undefined,
    error: undefined,
    loading: false
}

export default (state: State = initial, action: Action<ApplicationInfo>): State => {
    switch (action.type) {
        case RETRIEVE_APPLICATION_INFO: {
            return { data: undefined, error: undefined, loading: true }
        }
        case RETRIEVED_APPLICATION_INFO: {
            return { data: action.payload, error: undefined, loading: false };
        }
        case FAILED_APPLICATION_INFO: {
            return { data: undefined, error: action.error, loading: false }
        }
        default: {
            return state;
        }
    }
}