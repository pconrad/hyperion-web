import configureStore, { mockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';

const createStore = configureStore([ thunk ]);

export default createStore;