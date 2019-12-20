import {INCREMENT, DECREMENT} from '../action_types';
//从type类型可以知道，有2个action对象
export const increment = value => ({type: INCREMENT, data: value});
export const decrement = value => ({type: DECREMENT, data: value});

export const incrementAsync = (value, time)=>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(increment(value));
        }, time);
    }
}