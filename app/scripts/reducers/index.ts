import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux'

import applicationInfo from './applicationInfo';
import history from './history';

const reducer: Reducer<any> = combineReducers({
    applicationInfo,
    history,
    routing: routerReducer
});

export default reducer;
