<!--
 * @Author: Lee
 * @Date: 2021-11-07 14:17:09
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-26 22:05:19
-->

<template>
  <div class="page">
    <app-header v-if="env !== 'weixin'" title="我的" :show-status-bar="false" />
    <div class="coming-soon">Demo Example</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/@lgs/AppHeader/AppHeader.vue';
import Tools from 'lg-tools';

const env = ref(Tools.getEnv());

</script>

<style lang="less" scoped></style>
