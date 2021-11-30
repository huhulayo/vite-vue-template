/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:20:41
 * @LastEditTime: 2021-11-30 20:34:41
 * @LastEditors: Lee
 * @Description: 入口文件
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { globalStoreKey } from './store';
import vant from 'vant';
import Schemes from 'lg-schemes';
import Tools from 'lg-tools';
// import vconsole from 'vconsole';
import directives from './directives';
import filters from './filters';

import './utils/rem';
import './index.css';
import 'vant/lib/index.css';

// 1. vconsole
if (import.meta.env.MODE === 'dev') {
  // new vconsole();
}

// 2. 分环境加载脚本资源（同时开发支付宝生活号和微信公众号时配置）
if (import.meta.env.VITE_APP_SOURCE === 'mp') {
  switch (Tools.getEnv()) {
    case 'weixin':
      Tools.loadScript(['https://res.wx.qq.com/open/js/jweixin-1.6.0.js']);
      break;
    case 'alipay':
      Tools.loadScript([
        'https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.5/alipayjsapi.min.js',
      ]);
      break;
    default:
  }
}

// 3. App配置/挂载相关
// a. 创建App
const app = createApp(App);

// b. 注入
app.use(router).use(store, globalStoreKey).use(vant);

// c. 配置全局属性 -- 访问：在setup函数中通过ctx访问 eg-ctx.$sayHi
app.config.globalProperties.$filters = filters;

// d. 自定义指令
directives(app);

// e. 配置Schemes(提示：原生嵌套H5时配置)
Schemes.config('xxx://www.xxx.com', '二级目录');

// f. 挂载
app.mount('#app');
