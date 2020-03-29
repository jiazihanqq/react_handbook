// UI组件，负责页面的展现，结构上是容器组件的子组件，傻瓜组件

import React from 'react';
import 'antd/dist/antd.css'
import {Input, Button, List} from "antd";

const TodoList_antD_UI = (props) => {
    return (<div style={{marginTop: "10px", marginLeft: '10px'}}>
        <div>
            <Input value={props.inputValue}
                   type="text"
                   placeholder={'Todo Info'}
                   style={{width: '300px', marginRight: '10px'}}
                   onChange={props.handleInputChange}
            />
            <Button type="primary"
                    onClick={props.handleButtonClick}>提交</Button>
        </div>
        <List style={{marginTop: '10px', width: '300px'}}
              bordered
              dataSource={props.list}
              renderItem={(item, index) => (
                  <List.Item onClick={() => {
                      props.handleItemClick(index)
                  }}>{item}</List.Item>)}
        />
    </div>);
};

export default TodoList_antD_UI;