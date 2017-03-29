import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux'

const reducer: Reducer<any> = combineReducers({
    routing: routerReducer
});

export default reducer;
