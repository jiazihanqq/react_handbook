import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';

// App的JSX语法的意思是，将Provider和store完成绑定
// Provider组件的所有子组件都能够获取到store中的内容

const App = (
    <Provider store={store}>
        <TodoList />
    </Provider>
);
// JSX语法
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(App, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
