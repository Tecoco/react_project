import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {reqLogin} from '../../api'; //api中由有index.js，引入路径时，可以省略
import './css/login.less';
import logo from './images/logo.png';
import {saveUserInfo} from '../../redux/actions/login_action'
const {Item} = Form;

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            // console.log(err, values);//null {username: 'admin', password: 'admin'}
            if (!err) {
                //发送请求
                //因为服务器端没有对json编码格式做处理，所以这里使用了query参数格式
                //`username=${values.username}&password=${values.password}` //业务逻辑和请求都是成功的，但如果多个地方都需要发送请求，用这种方式，显然是不合理的，
                //所以使用拦截器去处理编码格式
                //{params:{username:values.username, password:values.password}} //status 0, 业务逻辑错误，请求是成功的，因为这个是json格式的
             /*    axios.post('http://localhost:3001/login').then(
                    reponse => console.log('成功的',reponse),
                    error => console.log(error)
                ); */
                let loginResult = await reqLogin(values);//只等待成功的结果
                const {status, data} = loginResult;
                if(status === 0){
                    message.success('登录成功！',1);//?
                    this.props.history.push('/admin');
                    //此处需把data交给redux管理
                    console.log(this.props);
                    this.props.saveUserInfo(data);
                }else{
                    message.warning(1);//第二个参数指的是秒数
                }
            }
            // console.log(err,values); //如果这样正常测试，不会出现结果，必须要加callback(),在下面的代码中
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
        if(this.props.userInfo.isLogin){
			//进入此判断，意味着：用户已经登录，但是还要看login，不允许，强制跳转到admin
			//this.props.history.replace('/admin')
			return <Redirect to="/admin"/>
		}
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
// export default Form.create()(Login);
export default connect(
    state => ({userInfo: state.userInfo}),
    {saveUserInfo}
)(Form.create()(Login));
