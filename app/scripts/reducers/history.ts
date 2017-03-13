import {
    Action,
    FAILED_HISTORICAL_READING,
    RETRIEVE_HISTORICAL_READING,
    RETRIEVED_HISTORICAL_READING
} from '../actions'
import { Reading } from '../model';

interface State {
    data?: Reading
    error?: Error
    loading: boolean
    searchDate?: Date
}

const initial: State = {
    data: undefined,
    error: undefined,
    loading: false,
    searchDate: undefined
}

export default (state: State = initial, action: Action<any>): State => {
    switch (action.type) {
        case RETRIEVE_HISTORICAL_READING: {
            return { data: undefined, error: undefined, loading: true, searchDate: action.payload }
        }
        case RETRIEVED_HISTORICAL_READING: {
            return { data: action.payload, error: undefined, loading: false };
        }
        case FAILED_HISTORICAL_READING: {
            return { data: undefined, error: action.error, loading: false }
        }
        default: {
            return state;
        }
    }
}