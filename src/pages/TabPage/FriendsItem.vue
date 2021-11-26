<!--
 * @Author: your name
 * @Date: 2021-06-07 10:43:50
 * @LastEditTime: 2021-06-10 13:09:21
 * @LastEditors: Li-HONGYAO
 * @Description: In User Settings Edit
 * @FilePath: \多多汇宝\src\pages\Friends\FriendsItem.vue
-->

<template>
  <div class="friends-item px-10 mt-10">
    <div
      class="
        wrap
        d-flex
        justify-content-between
        align-items-center
        bg-FFFFFF
        py-12
        px-10
        rounded-6
      "
    >
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="avatar icon-30x30 bg-cover rounded-circle"
          :style="{
            background: `#ff5e33 url(${data.avatar}) no-repeat center center`,
          }"
        ></div>
        <div class="f16 color-333333 ml-16 f-400">{{data.nickName}}</div>
      </div>
      <!-- 状态 -->
      <div v-if="data.activeStatus" class="status">待激活</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface FriendsItemType {
  avatar: string;
  nickName: string;
  activeStatus: number;
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<FriendsItemType>,
      default: {
        avatar: '',
        nickName: '-'
      }
    }
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.status {
  width: 60px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff5e33;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 4px 3px 0 #ff5e3390;
}
</style>
