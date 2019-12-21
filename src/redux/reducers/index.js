//用于汇总所有的reducer，最终生成一个最终的reducer
import CounterReducer from './counter_reducer';
import PersonReducer from './person_reducer';
import {combineReducers} from 'redux';

//redux 集中式管理状态 {count:0, persons:[]} ===> 这是初始化状态

export default combineReducers({
	count:CounterReducer,
	persons:PersonReducer
})
