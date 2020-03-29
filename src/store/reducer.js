import {
    CHANGE_INPUT_VALUE,
    ADD_TODO_ITEM,
    DEL_TODO_ITEM,
    INIT_LIST_ACTION,
} from './store/actionTypes'
// 相当于记事本，存储着
// （1）存储数据的情况
// （2）数据的操作
const defaultState = {
    inputValue: '123',
    list: [1, 2]
};
/**
 * reducer 对之前的数据进行处理，并通过action返回一个新的数据；
 * @param state 接收到之前的数据集合
 * @param action action是通过store.dispatch方法传入的参数；
 * return回来的新state交给了store
 * @returns {{inputValue: string, list: number[]}}
 */
export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
        // reducer 是不允许修改原来的state的
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === DEL_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }
    if (action.type === INIT_LIST_ACTION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data;
        return newState;
    }
    return state;
}