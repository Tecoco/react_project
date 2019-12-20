//初始化状态
let initState = 0;
//形参初始化，或者叫形参赋值
export default function countor(preState=initState, action){
    let {type, data} = action;
    let newState;
    
    switch (type) {
        case 'increment':
            newState = preState + data;
            return newState;
        case 'decrement':
            newState = preState - data;
            return newState;
        default:
            return preState;
    }
}
