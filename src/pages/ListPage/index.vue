<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-06-12 11:44:50
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-26 22:10:19
 * @Description: 
-->

<template>
  <div class="page px-10">
    <app-header
      v-if="env !== 'weixin'"
      title="提现记录"
      :showBack="true"
      :show-status-bar="false"
    />
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <template v-if="data">
        <van-list
          v-model:loading="isLoading"
          finished-text="没有更多了~"
          :finished="isFinished"
          :offset="50"
          :immediate-check="false"
          @load="onLoad"
        >
          <template v-if="data.length > 0">
            <div
              class="item"
              v-for="(item, index) in data"
              :key="index"
              :data="item"
            >
              <div>
                <div class="mb-8 ff-DIN-Bold">¥&nbsp;{{ item.amount }}</div>
                <div class="color-686868">{{ item.withdrawTime }}</div>
              </div>
              <div :style="{ color: statusColors[item.paymentStatus] }">
                {{ statusText[item.paymentStatus] }}
              </div>
            </div>
          </template>
          <no-data v-else />
        </van-list>
      </template>
      <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import AppHeader from '@/components/@lgs/AppHeader/AppHeader.vue';
import NoData from '@/components/@lgs/NoData/NoData.vue';
import api from '@/api';
import Tools from 'lg-tools';

interface RecordItemProps {
  amount: number;
  paymentStatus: number /** 提现状态 (0：处理中 1：成功 2：失败) */;
  withdrawTime: string;
}
interface StateProps extends GD.ListProps<RecordItemProps[] | null> {}

const state = reactive<StateProps>({
  page: 1,
  data: null,
  type: 'refresh',
  isRefreshing: false,
  isLoading: false,
  isFinished: false,
});

// constants
const statusColors = ['#FF7E26', '#39C83E', '#FF2A2A'];
const statusText = ['处理中', '提现成功', '提现失败'];
const env = Tools.getEnv();

// methods
const getDataSource = () => {
  api.test
    .records<GD.BaseResponse<RecordItemProps[]>>({
      page: state.page,
      pageSize: 20,
    })
    .then((res) => {
      if (res && res.code === 0) {
        const { pageNo, pages } = res.page;
        // 处理数据
        if (state.type === 'refresh' || state.data === null) {
          state.data = res.data;
          state.isRefreshing = false;
        } else {
          state.data = [...state.data!, ...res.data];
          state.isLoading = false;
        }
        state.isFinished = pageNo >= pages;
      }
    });
};
// events
const onRefresh = () => {
  state.page = 1;
  state.type = 'refresh';
  setTimeout(() => {
    getDataSource();
  }, 1000);
};
const onLoad = () => {
  state.page += 1;
  state.type = 'load';
  setTimeout(() => {
    getDataSource();
  }, 1000);
};

onMounted(() => {
  getDataSource();
});
const { page, data, type, isRefreshing, isLoading, isFinished } = toRefs(state);
</script>

<style lang="less" scoped>
.van-pull-refresh {
  min-height: 600px;
}
.van-loading {
  margin-top: 120px;
}
.item {
  height: 63px;
  background-color: #fff;
  margin-top: 6px;
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 10px;
  line-height: 14px;
}
</style>
