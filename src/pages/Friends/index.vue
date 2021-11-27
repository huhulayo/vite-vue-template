<template>
  <div class="page">
    <app-header v-if="env !== 'weixin'" title="好友" :show-status-bar="false" />
    <div class="coming-soon">Demo Example</div>
    <drag-view @tap="onTap">
      <div class="box flex-h-center">Drag</div>
    </drag-view>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/@lgs/AppHeader/AppHeader.vue';
import Tools from 'lg-tools';
import DragView from '@/components/@lgs/DragView/DragView.vue';

const env = Tools.getEnv();

const onTap = () => {
  console.log('点击拖拽视图...');
};
</script>

<style lang="less" scoped>
.box {
  width: 100px;
  height: 100px;
  background: #999999;
  border-radius: 8px;
  font-size: 18px;
  color: #ffffff;
}
</style>
