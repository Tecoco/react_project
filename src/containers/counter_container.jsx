import {connect} from 'react-redux';
import Counter from '../components/counter';
import {increment, decrement} from '../redux/action_creators';
//完整版
/* //从redux获取初始化或者加工的状态
function getReduxStateToProps(state){
    // console.log(state); //0 初始状态
    return {count: state}; //这行代码相当于 <Counter count={state} />
}

//从redux获取dispatch()方法
function getReduxMethodToProps(dispatch){
    return {increment: (value)=>{dispatch(increment(value))},
            decrement: (value)=>{dispatch(decrement(value))},
           }; 
}
export default connect(getReduxStateToProps, getReduxMethodToProps)(Counter); */
//简洁版

//从redux获取dispatch()方法

export default connect(
            state => ({count: state}), 
            {increment, decrement}
            )(Counter);
