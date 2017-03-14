import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux'

import applicationInfo from '../about/reducer';
import history from '../history/reducer';

const reducer: Reducer<any> = combineReducers({
    applicationInfo,
    history,
    routing: routerReducer
});

export default reducer;
