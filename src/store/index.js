import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga';
import TodoSagas from './sagas';

// 将图书笔记本引入进来

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = typeof window === 'object' && window.____REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.____REDUX_DEVTOOLS_EXTENSION_COMPOSE__({sagaMiddleware}) : compose;

const enhancer = composeEnhancers();
/**
 * 创建了一个图书管理员store，并将图书小册子reducer交给图书管理员；
 * 使用redux-thunk中间件；
 *  将redux_devtools传递给store，用于调试；
 * @type {Store<unknown, Action>}
 */
const store = createStore(
    reducer,
    enhancer
);
sagaMiddleware.run(TodoSagas);
export default store;
