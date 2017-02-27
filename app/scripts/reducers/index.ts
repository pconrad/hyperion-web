import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux'

import applicationInfo from './applicationInfo';

const reducer: Reducer<any> = combineReducers({
    applicationInfo,
    routing: routerReducer
});

export default reducer;
