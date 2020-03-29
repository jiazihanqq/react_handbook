import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DEL_TODO_ITEM,
    INIT_LIST_ACTION,
    GET_INIT_LIST
} from './actionTypes'
import store from "./index";

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM,
});

export const getDelItemAction = (index) => ({
    type: DEL_TODO_ITEM,
    index
});

export const initListAction = (data) => ({
    type: INIT_LIST_ACTION,
    data
});

// 使用redux-saga实现异步函数与组件的剥离
export const getInitList = () => ({
    type: GET_INIT_LIST,
});