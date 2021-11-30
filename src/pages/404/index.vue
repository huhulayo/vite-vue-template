<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-06-03 10:29:54
 * @LastEditTime: 2021-11-30 20:53:26
 * @LastEditors: Lee
 * @Description: 
-->

<template>
  <div className="page">
    <img
      src="https://img.meituan.net/csc/b8dc984b0f717bda7464e747b0fc909988525.png"
      alt="404 缺省图"
      class="not-found__img"
    />
    <div class="not-found__tips">您所访问的页面不存在 ~</div>
    <div class="not-found__btn" @click="$router.push('/')">返回首页</div>
  </div>
</template>


<style lang="less" scoped>
.page {
  text-align: center;
}
.not-found__img {
  width: 50%;
  margin: 120px auto 0;
}
.not-found__tips {
  font-size: 14px;
  color: #999999;
  margin-top: 20px;
  letter-spacing: 1px;
}

.not-found__btn {
  width: 182px;
  height: 40px;
  background: #f1f1f1;
  border-radius: 4px;
  margin: 50px auto;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 17px;
  font-weight: 600;
  color: #5fb776;
}
</style>
