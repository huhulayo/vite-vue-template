/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:20:41
 * @LastEditTime: 2021-11-27 09:40:28
 * @LastEditors: Lee
 * @Description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { globalStoreKey } from './store';
import vant, { Toast } from 'vant';
import Schemes from 'lg-schemes';
import Tools from 'lg-tools';
// import vconsole from 'vconsole';
import directives from './directives';
import filters from './filters';

import './utils/rem';
import './index.css';
import 'vant/lib/index.css';

if (import.meta.env.MODE === 'dev') {
  // new vconsole();
}

// 分环境加载脚本资源
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

// App配置/挂载相关
// 1. 创建App
const app = createApp(App);
// 2. 注入
app.use(router).use(store, globalStoreKey).use(vant).use(Toast);
// 3. 配置全局属性 -- 访问：在setup函数中通过ctx访问 eg-ctx.$sayHi
app.config.globalProperties.$filters = filters;
// 4. 自定义指令
directives(app);

// 5. 杂项配置 - schemes
Schemes.config('xxx://www.xxx.com', '二级目录');

// 6. 挂载
app.mount('#app');
