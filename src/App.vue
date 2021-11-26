<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-03-26 22:43:41
 * @LastEditTime: 2021-11-27 00:00:17
 * @LastEditors: Lee
 * @Description: 
 * @FilePath: \vite-vue-template__H5\src\App.vue
-->
<template>
  <!-- 环境判断 -->
  <template v-if="source_mp && ['weixin', 'alipay'].indexOf(env) === -1">
    <not-weixin></not-weixin>
  </template>
  <template v-else>
    <router-view v-slot="{ Component }" v-if="$route.meta.isKeepAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view v-else />
    <tab-bar v-if="$route.meta.isTabPage" />
  </template>
  <!-- 全局组件：绑定手机号 -->
  <van-popup
    v-model:show="showBindPhone"
    position="bottom"
    closeable
    @close="onHideBindPhone"
    @click-close-icon="onTapBindPhoneCloseIcon"
  >
    <BindPhone />
  </van-popup>
</template>

<script setup lang="ts">
import TabBar from '@/components/@lgs/TabBar/TabBar.vue';
import NotWeixin from '@/components/@lgs/NotWeixin/NotWeixin.vue';
import Tools from 'lg-tools';
import { ref, provide, onMounted } from 'vue';
import Bus from 'lg-bus';
import router from './router';
import BindPhone from "./components/@lgs/BindPhone/BindPhone.vue";
// ==> 正常逻辑
// 获取当前环境
const env = Tools.getEnv();
// 判断是否支持公众号
const source_mp = import.meta.env.VITE_APP_SOURCE === 'mp';

// ==> 全局组件
const showBindPhone = ref(false);
const isTapCloseIcon = ref(false);
const isBindedPhone = ref(false);

// 监听到手机绑定之后刷新数据
provide('BINDED_PHONE', (cb: Function) => {
  Bus.$on('BINDED_PHONE', () => {
    cb();
  });
});
// events
const onHideBindPhone = () => {
  Bus.$emit('BIND_PHONE_TO_INDEX');
  if (
    // 过滤路由/不跳转/当前页绑定
    !/(callback$)|(integral$)|(mine$)|(set$)/.test(window.location.pathname) &&
    isTapCloseIcon.value &&
    !isBindedPhone.value
  ) {
    isTapCloseIcon.value = false;
    router.back();
  }
};
const onTapBindPhoneCloseIcon = () => {
  isTapCloseIcon.value = true;
};

// life circles
onMounted(() => {
  // 记录首次进入时的url，用于iOS注册js-sdk
  window.CONFIG_URL_FOR_IOS = window.location.href;
  // 监听手机号绑定相关事件
  Bus.$on('SHOW_BIND_PHONE', () => {
    showBindPhone.value = true;
  });
  Bus.$on('BINDED_PHONE', () => {
    showBindPhone.value = false;
    isBindedPhone.value = true;
  });
  // 监听用户点击系统返回按钮事件 --
  window.addEventListener(
    'popstate',
    function (e) {
      if (showBindPhone.value) {
        showBindPhone.value = false;
      }
    },
    false
  );
});
</script>

<style lang="less"></style>
