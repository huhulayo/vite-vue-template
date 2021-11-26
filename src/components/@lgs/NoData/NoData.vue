<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-01-09 17:21:51
 * @LastEditTime: 2021-11-21 11:18:24
 * @LastEditors: Lee
 * @Description: 
-->
<template>
  <div class="no-data" :style="{paddingTop: top + 'px'}">
    <img src="./images/no-data__3.png" alt="" />
    <p v-if="!!tips" class="tips">{{tips}}</p>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tips: {
      type: String,
    },
    top: {
      type: Number,
      default: 50
    }
  },
});
</script>


<style scoped="scoped" lang="less">
.no-data {
  text-align: center;
  img {
    width: 151.66px;
  }
  .tips {
    font-size: 16px;
    text-align: center;
    color: #c9c9c9;
  }
}
</style>
