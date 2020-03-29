import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Input, Button, List} from "antd";
import store from './store/index';
import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DEL_TODO_ITEM} from './store/actionTypes'
import {getInputChangeAction} from './store/actionCreator'

class TodoList_antD extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        // 组件订阅store的变化
        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (<div style={{marginTop: "10px", marginLeft: '10px'}}>
            <div>
                <Input value={this.state.inputValue}
                       type="text"
                       placeholder={'Todo Info'}
                       style={{width: '300px', marginRight: '10px'}}
                       onChange={this.handleInputChange}
                />
                <Button type="primary" onClick={this.handleButtonClick}>提交</Button>
            </div>
            <List style={{marginTop: '10px', width: '300px'}}
                  bordered
                  dataSource={this.state.list}
                  renderItem={(item, index) => (
                      <List.Item onClick={this.handleItemClick.bind(this, index)}>{item}</List.Item>)}/>
        </div>);
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