/*
 * @Author: Li-HONGYAO
 * @Date: 2021-03-27 10:14:34
 * @LastEditTime: 2021-11-27 10:33:42
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \vite-vue-template__H5\src\utils\request.ts
 */
import router from '@/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookie from 'lg-cookie';
import Tools from 'lg-tools';
import Schemes from 'lg-schemes';
import { Toast } from 'vant';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST as string,
  timeout: 20000,
});

// 请求拦截

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // => 如果是GET请求追加时间戳
    if (config.method && /get/i.test(config.method)) {
      config.params = {
        ...config.params,
        timeState: Tools.randomCharacters(1) + Date.now(),
      };
    }
    // => 配置请求头
    const token = Cookie.get<string>('AUTHORIZATION_TOKEN');
    // => 确认平台（如果同时开发支付宝和微信公众号则需要传入来源/和后端配合商议对应平台的source值）(MP)
    let source = 'H5';
    switch (Tools.getEnv()) {
      case 'alipay':
        source = 'MP_WEIXIN';
        break;
      case 'weixin':
        source = 'MP_ALIPAY ';
        break;
      default:
    }
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      source
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 清除toast
    Toast.clear();
    const { code, msg } = response.data;
    switch (code) {
      case 0:
        return response.data;
      case 401:
        // token失效的处理方案
        // 场景1：APP
        /*
        Schemes.jump("/login", {
          url: encodeURIComponent(window.location.href),
        });*/
        // 场景2：公众号或者支付宝
        router.replace("/auth/jump");
        return response.data;
      default:
        Toast.fail(msg);
        return response.data;
    }
  },
  (error: any) => {
    console.log(error);
    /timeout/.test(error.message) && Toast('请求超时，请检查网络');
    return Promise.reject(error);
  }
);

export default service;
