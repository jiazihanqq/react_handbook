import React from 'react';

class Animation extends React.Component {
    constructor(props) {
        super(props);
        // 修改handleClick的指向
        this.handleToggle = this.handleToggle.bind(this);
    }

    render() {
        return (<Fragment>

            <div className={this.state.show ? 'show' : 'false'}></div>
            <button onClick={this.handleToggle}>toggle</button>
        </Fragment>)
    }

    /**
     * 实现点击li标签删除事务的功能
     * 子组件通过this.props接受传递过来的方法与数据
     */
    handleToggle() {
        const {delItem, index} = this.props;
        //调用父组件传递的delItem方法，和index参数；
        delItem(index);
    }
}

export default Animation;