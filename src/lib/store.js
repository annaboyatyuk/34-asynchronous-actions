import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import coffeeState from '../reducer/coffee';
import logger from '../reducer/redux-logger';


const rootReducer = combineReducers({
  coffeeState,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

