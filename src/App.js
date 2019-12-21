import React, { Component } from 'react';
import CounterContainer from './containers/counter_container';
import PersonContainer from './containers/person_container';

export default class App extends Component {
  render(){
    return (
      <div>
        <h1>使用多个组件共享状态redux</h1>
        <h2>Counter组件</h2>
        <CounterContainer />
        <hr />
        <h2>Person容器组件</h2>
        <PersonContainer />
      </div>
      
    );
  }
}

