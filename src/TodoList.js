import React from "react";
import {connect} from "react-redux";


// 方便在react中使用redux
const TodoList = (props) => {
    const {inputValue, handleInputChange, handleButtonClick, handleDelete, list} = props;
    return (
        <div>
            <div>
                <input value={inputValue}
                       type="text"
                       onChange={handleInputChange}
                />
                <button onClick={handleButtonClick}>提交</button>
            </div>
            <ul>
                {
                    list.map((item, index) => {
                        return <li onClick={handleDelete} key={index}>{item}</li>
                    })
                }
            </ul>
        </div>
    );
};

// 用来描述Todolist组件和store的映射规则；
// 将Store中的内容映射到组件中作为props使用；
// 控制流入组件的数据
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
};
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
        },
        handleButtonClick() {
            const action = {
                type: 'add_item'
            };
            dispatch(action);
        },
        handleDelete(index) {
            const action = {
                type: 'delete_item',
                index
            };
            dispatch(action);
        }
    }
};


// 将todolist组件和store进行链接，
// 在Provider的范围内，都有能力链接store
// 将组件包装成一个容器组件，并export出去，将数据和状态准备好；
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);