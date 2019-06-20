import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import todoReducer, { IState } from '../_reducers/todoReducer';

export interface IStoreState {
  todo: IState;
}

const reducer = combineReducers({
  todo: todoReducer
})

const composeWithDevTool = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  process.env.NODE_ENV === 'development' ? composeWithDevTool(applyMiddleware(thunk)) : applyMiddleware(thunk)
)

export default store;
