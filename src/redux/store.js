//创建redux的核心对象---store
import {createStore, applyMiddleware} from 'redux';
//引入reducers
import reducer from './reducers';
//引入redux-thunk , 用于处理异步action
import thunk from 'redux-thunk';
//引入redux-devtools-extension，用于支持redux开发工具
import {composeWithDevTools} from 'redux-devtools-extension';

//直接让reducer去做初始化状态和加工的状态，并返回加工后的状态和数据
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
