import React, {Component, Fragment} from 'react';
import TodoItem from "./TodoItem";
import axios from 'axios';
import './style.css'


class TodoList extends Component {
    // JSX语法，需要引入react进行编译；
    // 如果要引入自己定义的组件，就必须是大写开头的；
    // 返回的元素必须在最外层有一个包裹元素,可以使用</Fragment>作为占位符；
    // react不推荐直接修改dom元素，要通过修改模型的方式修改；
    // eslint-disable-next-line no-useless-constructor
    // （3）使用propTypes和defaultProps外部传入属性的限制，react文档中有详细的描述

    // （4）props state 和render函数的关系，理解react是如何实现数据驱动视图的
    // - 当组件的 state 或者 props 发生变化的时候，render函数就会重新执行
    // - 在当父组件向子组件传值的时候，同时触发了父子组件的render函数
    // - 当父组件的render函数被执行，所有子组件的render函数也将被动的执行

    // （5）虚拟dom
    // 方案1
    // -生成state数据
    // -生成JSX模版
    // -数据 + 模版 在render中结合，生成真实的DOM，来显示
    // -state 发生改变
    // -数据 + 模版 重新在render中结合，生成真实的DOM，替换原始的DOM

    // 这么做十分的消耗性能，虚拟DOM就是解决这个问题，
    // 方案2
    // -在state发生改变的时候，
    // -数据 + 模版重新结合(DocumentFragment)，生成真实的DOM，并不直接替换原始的DOM
    // -新的DOM和原始的DOM进行diff，找差异
    // -找到发生变化的元素，替换掉老的DOM中的元素

    // 这么做，尽管节约了DOM树渲染的开销，但是在DOM比对的时候依旧十分消耗性能
    // 方案3
    // -state数据
    // -JSX模版
    // -数据 + 模版结合，生成真实的DOM，来显示
    // -生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实的DOM）
    // 形如：<div id='abc'><span>helloworld</span></div>
    // 记录成：['div', {id:'abc'},['span',{},'helloworld']]
    // -state发生变化
    // -生成一个新的虚拟DOM
    // 比较新旧虚拟DOM的差异

    // 渲染过程
    // JSX-> JS对象 ->真实的DOM，React.createElement()底层接口，创建dom元素

    // 优势
    // -性能提升了
    // -使得跨段应用得以实现。React Native开发原生应用

    // diff算法，（新的虚拟dom和原始的虚拟dom的比对方法）包含两个方面：1.元素的同层比对;2.key值的比对；
    // （1）同层的元素做比对，若不同则替换节点；
    // （2）将新的子节点挂载到新节点上；
    // （3）使用一个稳定的内容作为元素的key值，也可以提高比对的性能，不要使用index序号作为key值；

    // 使用Ref操作dom（参见149行）
    // 尽管Ref可以添加引用，并且可以通过setState的回掉函数完成dom的操作
    // 但是这种操作是不推荐的，因为破坏了react数据驱动的设计模型；

    // react的生命周期函数
    // initialization: constructor props&states
    // mounting 组件挂载页面: componentwillmount => render => componentdidmount
    // updating : shouldcomponentupdate: boolean => componentwullupdate => render => componentdidupdate
    // props 的updating： componentwillreceiveprops 从父组件接受参数的时候，只要父组件的render执行，此生命周期函数就会执行
    // unmounting： componentwillunmount

    // 生命周期使用举例说明
    // （1）shouldcomponentupdate(nextProps, nextState)，避免子组件重新render
    // （2）在componentdidmount中发送ajax请求

    // react性能提升的方法
    // （1）事件函数在constructor中bind(this)
    // （2）setState是异步执行函数，提高性能
    // （3）虚拟dom比对，同层比对，key值比对
    // （4）shouldcomponentupdate
    // （5）使用无状态组件定义UI组件

    // react动画
    // .hide{ animation: hide-item 2s ease-in forwards}
    // 添加forwards可以在动画结束后保留最后一桢的效果
    // @key-frames hide-item{0% {opacity: 1; color:red}}

    // 使用react-transition-group实现动画，详见文档
    // (1)CSSTransition指令
    // in 动画入场、出场判断、
    // timeout
    // 添加className前缀
    // 在css中实现fade-enter fade-enter-active fade-enter-done
    // fade-exit fade-exit-active fade-exit-done
    // fade-appear-active 当页面初次进入的时候，也能携带动画
    // （2）css-transition-group实现多个元素的统一动画效果
    // 内部使用循环嵌套 CSSTransition 指令实现

    // redux，各个组件都把数据统一放到store中，
    // 当store中的内容有变化时，其他组件会自动感知到
    // react： 借书的人
    // action creator： 借书的要求
    // store： 图书管理员
    // reducers： 图书位置记录本

    // (1)创建store，并将reducer传递进来，完成图书的登记
    // (2)reducer中负责管理业务数据，并以函数的形式返回

    // 改变store中的数据
    // 使用actionTypes文件，定义action常量，防止打字错误
    // 使用actionCreator统一创建和管理action

    // redux设计三个原则
    // （1）store是唯一的
    // （2）只有store能改变自己的内容
    // （3）reducer必须是纯函数，
    // 纯函数：1.输入固定则输出固定;2.无任何副作用（对传入参数的修改叫做副作用），所以一个函数中含有time函数、ajax请求等，那就一定不是一个纯函数

    // 容器组件和UI组件的拆分
    // 无状态组件，组件内部只有一个render函数，并且结构不是一个类，只是一个函数
    // 无状态组件的性能比较高，省去了生命周期函数的过程

    // redux发送异步请求，获取数据
    // 使用redux中间件进行ajax请求，将异步的代码从组件中移动到actions中去；
    // 在使用了redux-thunk之后，action不止是对象，可以是异步函数

    // 什么是redux中间件
    // 指的是action和store之间的中间件
    // (1)如果store.dispatch接到了对象类型，则直接交给store
    // (2)如果store.dipatch接到了函数类型，则先执行函数，交给组件进行2次处理
    // 其他的中间件 redux-thunk、redux-logger、redux-saga

    // redux-saga中间件




    constructor(props) {
        super(props);
        // this.state用于记录组件的数据模型，组件的状态
        this.state = {
            inputValue: '',
            list: []
        };
        // 将this指向的绑定放在构造函数中，有利于性能的提升
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    /**
     * 捕捉input中的输入
     * @param evt
     */
    handleInputChange(evt) {
        // (1) state中的数据不能直接修改，通过this.setState()函数进行修改
        // this.state.inputValue = evt.target.value;
        // this.setState({
        //     inputValue: evt.target.value
        // })
        // (2) react16中，不再推荐返回对象，而是返回一个函数,此时赋值操作会变成一个异步操作，有利于性能的提升
        // 性能提升的原理，通过异步的方式，将多个setState合并成一个，减少diff比对的次数；
        const value = evt.target.value;
        this.setState(() => ({
            inputValue: value
        }))
    }

    /**
     * 点击button，添加事务到li标签中
     * @param evt
     */
    handleButtonClick(evt) {
        // 通过prev参数，避免误修改,setState的第二个参数是一个回调函数，
        this.setState((prev) => ({
            list: [...prev.list, prev.inputValue],
            inputValue: ''
        }),()=>{
            this.ul.querySelector('div').length
        })
    }

    /**
     * 点击li标签，删除事务记录
     * @param index
     */
    handleItemDelete(index) {
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}
        })
    }

    getTodoItem() {
        return this.state.list.map((item, idx) => {
            return (
                // 通过标签上属性的方式向子组件传递数据和方法
                <TodoItem
                    key={idx}
                    content={item}
                    index={idx}
                    delItem={this.handleItemDelete}/>
            )
        })
    }
    componentDidMount() {
        axios.get('/api/todolist').then((res) => {
            this.setState(() =>({
                list: [...res.data]
            }))
        }).catch(() => {

        });
    }

    // 把循环的元素加上key值
    // JSX语法课程
    // （1）添加注释
    // (2)在JSX中使用css的样式类，要使用className，不要使用class,for也要写成htmlFor
    // （3）不希望客户输入的内容被自动转译，如<h1></h1>等，
    render() {
        return (
            /*Fragment是一个占位符*/
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <input id="insertArea"
                           className="input"
                           type="text"
                           value={this.state.inputValue}
                           onChange={this.handleInputChange}/>
                    <button onClick={this.handleButtonClick}>提交</button>
                </div>
                <ul ref={(ul) => {
                    this.ul = ul
                }}>{this.getTodoItem()}</ul>
            </Fragment>
        )
    }
}

export default TodoList;
