<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-06-18 15:07:28
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-30 20:53:04
 * @Description: 
-->

<script setup lang="ts">
import {  onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookie from 'lg-cookie';
import { Toast } from 'vant';
import Storage from 'lg-storage';
import Bus from 'lg-bus';
import LibForWeixin from '@/utils/LibForWeixin';

// constants
const route = useRoute();
const router = useRouter();
const { type } = route.params;
const { code, state, from } = route.query;

// methods
const jump = () => {
  // -- 拉起授权
  LibForWeixin.auth({
    appid: import.meta.env.VITE_APP_APPID_WEIXIN,
    state: from ? (from as string) : undefined,
    base: import.meta.env.VITE_APP_BASE,
  });
};
const callback = () => {
  // 提示信息
  Toast.loading({
    message: '处理中...',
    duration: 20 * 1000,
  });
  // -- 调用微信后置接口 -- 执行登录操作等
  setTimeout(() => {
    Toast.clear();
    // 1. 保存Token
    Cookie.set('AUTHORIZATION_TOKEN', '123');
    Storage.set('HAS_BIND_PHONE', false);
    // 2. 是否绑定手机号
    if (false) {
      // -- 已绑定：处理正常跳转
      if (state) {
        router.replace(decodeURIComponent(state as string));
      } else {
        router.replace('/');
      }
    } else {
      // -- 未绑定：显示全局组件
      Bus.$emit('SHOW_BIND_PHONE');
      // -- 监听跳转首页的事件（用户绑定成功/取消绑定手机号时）
      Bus.$on('BIND_PHONE_TO_INDEX', () => {
        router.replace('/');
      });
    }
  }, 1000);
};
// life circles
onMounted(() => {
  switch (type) {
    case 'jump':
      jump();
      break;
    case 'callback':
      callback();
      break;
    default:
  }
});
onUnmounted(() => {
  Bus.$off('BIND_PHONE_TO_INDEX');
});
</script>


<template>
  <div class="page"></div>
</template>