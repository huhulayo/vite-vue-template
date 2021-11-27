<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-03-07 23:13:57
 * @LastEditTime: 2021-11-27 09:12:43
 * @LastEditors: Lee
 * @Description: 
 * @FilePath: /vue-mp-template/src/components/@lgs/TabBar/TabBar.vue
  
-->
<template>
  <div class="tab-bar">
    <template v-for="(item, index) in paths" :key="index">
      <router-link replace class="tab-bar-item" :to="item.path">
        <img
          :src="
            item.path === $route.path ? item.selectedIconPath : item.iconPath
          "
          class="icon"
          alt="{{item.text}}"
        />
        <span class="text">{{ item.text }}</span>
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
const paths = [
  {
    path: '/index-page',
    text: '赚赚',
    iconPath: new URL('./images/icon_1.png', import.meta.url).toString(),
    selectedIconPath: new URL(
      './images/icon_1_sel.png',
      import.meta.url
    ).toString(),
  },
  {
    path: '/special-sale',
    text: '特卖',
    iconPath: new URL('./images/icon_2.png', import.meta.url).toString(),
    selectedIconPath: new URL(
      './images/icon_2_sel.png',
      import.meta.url
    ).toString(),
  },
  {
    path: '/friends',
    text: '好友',
    iconPath: new URL('./images/icon_3.png', import.meta.url).toString(),
    selectedIconPath: new URL(
      './images/icon_3_sel.png',
      import.meta.url
    ).toString(),
  },
  {
    path: '/mine',
    text: '我的',
    iconPath: new URL('./images/icon_4.png', import.meta.url).toString(),
    selectedIconPath: new URL(
      './images/icon_4_sel.png',
      import.meta.url
    ).toString(),
  },
];
</script>

<style lang="less" scoped>
.tab-bar {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;

  height: calc(50px + env(safe-area-inset-bottom));
  display: flex;

  position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #b5b5b5;
  &.router-link-active {
    color: #ff7a23;
  }
}
.icon {
  width: 22px;
  height: 22px;
}
.text {
  margin-top: 1px;
  font-size: 10px;
  line-height: 14px;
}
</style>
