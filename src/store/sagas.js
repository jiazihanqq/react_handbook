//saga要求必须有generator函数,供store中引用；
// redux-saga采用的是和redux-thunk不同的设计思路，
// 将异步执行的函数，单独存放到一个文件当中；
// redux-saga适用于大型的项目，redux-thunk适用于小型的项目

import {takeEvery, put} from 'redux-saga/effects'
import {GET_INIT_LIST} from './actionTypes'
import {initListAction} from './actionCreator'

import axios from 'axios'

function* getInitList() {
    try {
        const res = yield axios.get('/list.json');
        const action = initListAction(res.data);
        yield put(action);
    }catch (e) {
        // ajax的异常处理
    }

}

function* mySaga() {
    yield takeEvery('GET_INIT_LIST', getInitList);
}

export default mySaga;