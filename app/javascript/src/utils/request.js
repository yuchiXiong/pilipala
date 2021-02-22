/*
    * 单例axios示例
    1. 公共配置
    2. 拦截器
*/

import axios from 'axios';
import {message, notification} from 'antd';
// import history from './history';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://burogu.bubuyu.top',
    headers: {
        'Accept': 'application/json'
    }
});

instance.interceptors.request.use(config => {
    if (config.method !== 'get') {
        const csrfToken = document.querySelector('meta[name=csrf-token]').content;

        if (config.method === 'delete') {
            const formData = new FormData();
            formData.append('_method', 'delete');
            formData.append('authenticity_token', csrfToken);

            config.method = 'post';
            config.data = formData;
        } else {
            config.data.authenticity_token = csrfToken;
        }
    }
    return config;
});

instance.interceptors.response.use(config => {
    return config.data;
}, err => {
    if (!err.response) {
        notification.error({
            message: '从服务器拉取数据异常！',
            description: '当前无法从服务器获取响应，请检查您的网络是否通畅或联系网站管理员。',
            placement: 'topRight',
            duration: null
        });
        return false;
    } else {
        // * Http 401 给用户提示，并在3秒后跳转登录页
        if (err.response.status === 500) {
            // history.push('/error');
            return false;
        } else if (err.response.status === 401) {
            message.error(`${err.response.data.message}，请登录重试！`, 3).then(() => {
                // localStorage.removeItem('user');
                history.push('/user/sign_in');
            });
            return false;
        } else if (err.response.status === 404) {
            // history.push('/not-found')
            return false;
        } else {
            return err.response;
        }
    }
});

export default instance;