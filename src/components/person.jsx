import React, { Component } from 'react';

export default class Person extends Component {

	add = ()=>{
		const {name,age} = this.refs;
		this.props.addPerson({name:name.value,age:age.value});
	}
	
	render() {
		return (
			<div>
				<input type="text" placeholder="输入名字" ref="name"/>&nbsp;
				<input type="text" placeholder="输入年龄" ref="age"/>&nbsp;
				<button onClick={this.add}>添加</button>
				<ul>
					{
						this.props.persons.map((item,index)=>{
							return <li key={index}>{item.name},{item.age}</li>
						})
					}
				</ul>
			</div>
		)
	}
}
