import React , {Fragment}from 'react';
import logo from './logo.svg';
import './App.css';


/**
 * react编程的一些思考
 * （1）声明式开发：不直接操作dom（对应命令式开发）
 * （2）可以与其他框架共存，只操作挂载dom的渲染
 * （3）组件式开发
 * （4）单向数据流：数据模型只能在自己的作用域内修改，子组件只能使用，不能修改；
 * （5）react是一种视图层面的框架，任意组件间的通讯是很麻烦的，需要redux这种数据框架的协助
 * （6）函数式编程：方便面向测试的开发流程
 */

function App() {
  // JSX语法，需要引入react进行编译
  // 如果要引入自己定义的组件，就必须是大写开头的
  // 返回的元素必须在最外层有一个包裹元素,可以使用</Fragment>作为占位符
  return (
      <Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
      </Fragment>
  );
}

export default App;
