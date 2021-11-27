<!--
 * @Author: Lee
 * @Date: 2021-11-07 14:17:09
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-27 16:57:21
-->

<template>
  <div class="page">
    <app-header v-if="env !== 'weixin'" title="我的" :show-status-bar="false" />
    <div class="coming-soon">Demo Example</div>
    <div class="auth-button" @click="$router.push('/auth/jump')">微信授权</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/@lgs/AppHeader/AppHeader.vue';
import Tools from 'lg-tools';

const env = ref(Tools.getEnv());
</script>

<style lang="less" scoped>
.auth-button {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: cornflowerblue;
}
</style>
