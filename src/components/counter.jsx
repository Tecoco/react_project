import React, { Component } from 'react'

export default class Counter extends Component {
    //通过以下的代码type属性，可以看到有两个action对象
    increment = ()=>{
       const {select_num} = this.refs;
       //将字符串形式的数字转换为数值类型，直接乘以1
       this.props.store.dispatch({type: 'increment', data: select_num.value*1});
    }
    decrement = ()=>{
        const {select_num} = this.refs;
        this.props.store.dispatch({type: 'decrement', data: select_num.value*1});
    }
    incrementIfOdd = ()=>{
        const {select_num} = this.refs;
        let count = this.props.store.getState();
        if(count % 2 === 1){
            this.props.store.dispatch({type: 'increment', data: select_num.value*1});
        }
    }
    incrementAsync = ()=>{
        const {select_num} = this.refs;
        setTimeout(()=>{
            this.props.store.dispatch({type: 'increment', data: select_num.value*1});
        }, 500);
    }

    render() {
        return (
            <div>
                <h2>count is: {this.props.store.getState()}</h2>
                <select ref='select_num'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}
