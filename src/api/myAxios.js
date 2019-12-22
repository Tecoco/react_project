import axios from 'axios';
import qs from 'querystring';
import {message} from 'antd';
import NProgress from 'nprogress'; //进度条
import 'nprogress/nprogress.css'; //node_modules中，进度条的样式处理
import {BASE_URL} from '../config'; //项目核心配置文件

//请求基本路径
axios.defaults.baseURL = BASE_URL;
//请求拦截器
axios.interceptors.request.use(config => {
    NProgress.start(); //进度条开始
    let {method, data} = config;
    if(method.toUpperCase() === 'POST' && data instanceof Object){
        // console.log(data); //{username: "admin", password: "admin"}
        config.data = qs.stringify(data);
        // console.log(qs.stringify(data)); //username=admin&password=admin
    }

    return config;
});

//响应拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done(); //进度条结束
        return response.data;
    },
    error => {
        NProgress.done(); //进度条结束
        //这里需要特别的注意：返回的状态会影响最终接收到的结果；类似 .then()的链式调用
        //例如： return error.message 这里返回的是非promise值，则一定会走login.jsx中的reponse => console.log('成功的',reponse),
        //这样显然是不对的。
        //简化提示错误
        //统一处理所有请求失败
        message.error('请求出错了！');
        // return Promise.reject('拦截到，出错');
        return new Promise(()=>{});
    }
);
 export default axios;