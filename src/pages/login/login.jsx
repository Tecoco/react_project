import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './css/login.less';
import logo from './images/logo.png';
const {Item} = Form;

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            /* if (!err) {
                console.log('发送请求',values);
            } */
            console.log(err,values); //如果这样正常测试，不会出现结果，必须要加callback(),在下面的代码中
        });
        
    }
    /* 自定义密码校验 */
    pwdValidator = (rule, value, callback) => {
        if(!value){
            callback('密码必须输入!');
        }else if(value.length < 4){
            callback('密码必须大于等于4位!');
        }else if(value.length > 12){
            callback('密码必须小于等于12位!');
        }else if(!(/^\w+$/).test(value)){
            callback('密码必须是英文、数字或下划线组成!');
        }
        callback(); //按常理来说，这里不用写这个回调函数的，但由于antd底层的设置，如果不设置，会有错乱的现象
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='login'>
                <div className='login-header'>
                    <img src={logo} alt=""/>
                    <h1>商品管理系统</h1>
                </div>
                <div className='login-content'>
                    <h2>用户登录</h2>
                    {/* antd组件 */}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名必须输入!' },
                                        { min: 4, message: '用户名必须大于等于4位!' },
                                        { max: 12, message: '用户名必须小于等于12位!' },
                                        { pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成!' },
                                    ]
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.pwdValidator }]
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}
//完整写法
/* const WrappedLogin = Form.create()(Login);
export default WrappedLogin; */
//简洁写法
export default Form.create()(Login);
