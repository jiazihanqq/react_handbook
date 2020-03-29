import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

// 将图书笔记本引入进来
import reducer from "./reducer";


const composeEnhancers = typeof window === 'object' && window.____REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.____REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
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

export default store;
