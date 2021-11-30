<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-01-09 17:21:51
 * @LastEditTime: 2021-11-30 20:22:23
 * @LastEditors: Lee
 * @Description: 
-->

<template>
  <div class="env-tips">
    <img
      class="icon-info"
      src="https://img.meituan.net/csc/142c995aa7d56df6c8f21185cc61802c4225.png"
    />
    <h4 class="tips">请在微信或支付宝客户端打开链接</h4>
  </div>
</template>

<style scoped="scoped" lang="less">
.env-tips {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  text-align: center;
  margin-top: 50px;
  .icon-info {
    width: 64px;
    height: 64px;
  }
  .tips {
    margin-top: 30px;
    font-weight: 400;
    font-size: 20px;
  }
}
</style>
