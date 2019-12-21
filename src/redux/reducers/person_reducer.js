import {ADDPERSON} from '../action_types';
//初始化状态
let initState = [{name:'kobe',age:34},{name:'xiaohua',age:23}];
//形参初始化，或者叫形参赋值
export default function (preState=initState, action){
    let {type, data} = action;
    let newState;
    
    switch (type) {
        case ADDPERSON:
            newState = [data, ...preState];
            return newState;
        default:
            return preState;
    }
}
