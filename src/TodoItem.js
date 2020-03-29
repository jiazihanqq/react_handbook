import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        // 修改handleClick的指向
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const {content} = this.props ;
        return (<div onClick={this.handleClick}>{content}</div>)
    }

    /**
     * 实现点击li标签删除事务的功能
     * 子组件通过this.props接受传递过来的方法与数据
     */
    handleClick(){
        const {delItem, index} = this.props;
        //调用父组件传递的delItem方法，和index参数；
        delItem(index);
    }
}
export  default  TodoItem;