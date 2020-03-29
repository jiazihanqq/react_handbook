import React, {Component} from "react";
import {connect} from "react-redux";


// 方便在react中使用redux
class TodoList extends Component {

    render() {
        return (
            <div>
                <div>
                    <input value={this.props.inputValue}
                           type="text"
                           onChange={this.props.handleInputChange}
                    />
                    <button onClick={this.handleClick.bind(this)}>提交</button>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
        );
    }

    handleInputChange(e) {

    }
}

// 用来描述Todolist组件和store的映射规则；
// 将Store中的内容映射到组件中作为props使用；
// 控制流入组件的数据
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue
    }
}
// 负责将store.dispatch 和组件中的 props映射上；
// 可以修改store中的数据
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputChange(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            };
            dispatch(action);
        }
    }
}


// 将todolist组件和store进行链接，
// 在Provider的范围内，都有能力链接store

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);