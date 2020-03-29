// 容器组件，负责页面的逻辑，聪明组件
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import store from './store/index';
import {ADD_TODO_ITEM, DEL_TODO_ITEM} from './store/actionTypes'
import {getInputChangeAction, initListAction, getTodoList} from './store/actionCreator'
import TodoList_antD_UI from './TodoList_antD_UI'

class TodoList_antD extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        // 组件订阅store的变化
        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (
            <TodoList_antD_UI
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleInputChange={this.handleInputChange}
                handleButtonClick={this.handleButtonClick}
                handleItemClick={this.handleItemClick}
            />
        );
    }
    // 使用redux-thunk实现异步函数与组件的剥离
    componentDidMount() {
        const action = getTodoList();
        store.dispatch(action);
    }

    /**
     * 在input内容发生变化的时候，修改store中的内容
     * @param e
     */
    handleInputChange(e) {
        // 创建一个动作，之后调用store.dispatch将动作传递给store；
        // 在传递之后，需要更新reducer，让store知道怎么处理这个action

        // const action = {
        //     type: CHANGE_INPUT_VALUE, // 告诉redux，要做的事情是什么
        //     value: e.target.value       // 告诉redux，新的值是什么
        // };
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleButtonClick() {
        const action = {
            type: ADD_TODO_ITEM,
        };
        store.dispatch(action);
    }

    handleItemClick(index) {
        const action = {
            type: DEL_TODO_ITEM,
            index
        };
        store.dispatch(action)
    }
}

export default TodoList_antD;