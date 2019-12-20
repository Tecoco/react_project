//创建redux的核心对象---store
import {createStore, applyMiddleware} from 'redux';
//引入reducer
import reducer from './reducer';
//引入redux-thunk , 用于处理异步action
import thunk from 'redux-thunk';

//直接让reducer去做初始化状态和加工的状态，并返回加工后的状态和数据
export default createStore(reducer, applyMiddleware(thunk));
