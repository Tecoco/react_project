import {createStore,applyMiddleware} from 'redux';//引入核心的redux
import {composeWithDevTools} from 'redux-devtools-extension';//支持开发者工具
import thunk from 'redux-thunk'; //用于异步编码
import reducer from './reducers'; //引入合并后的reducer


export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));