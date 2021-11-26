<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-06-03 18:25:05
 * @LastEditTime: 2021-11-26 23:15:10
 * @LastEditors: Lee
 * @Description: 
-->

<template>
  <div class="page">
    <!-- 导航栏 -->
    <app-header
      v-if="env !== 'weixin'"
      title="我的好友 16"
      :showBack="true"
      :show-status-bar="showStatusBar"
    />
    <!-- 内容 -->
    <van-tabs v-model:active="active" color="#ff5e33" swipeable>
      <van-tab title="直接好友 1">
        <van-pull-refresh
          v-model="friendsDirect.isRefreshing"
          @refresh="onRefresh('friendsDirect')"
        >
          <template v-if="friendsDirect.data">
            <van-list
              v-model:loading="friendsDirect.isLoading"
              finished-text="没有更多了~"
              :finished="friendsDirect.isFinished"
              :offset="50"
              :immediate-check="false"
              @load="onLoad('friendsDirect')"
            >
              <template v-if="friendsDirect.data.length > 0">
                <FriendsItem
                  v-for="(item, index) in friendsDirect.data"
                  :key="index"
                  :data="item"
                />
              </template>
              <no-data v-else />
            </van-list>
          </template>
          <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="间接好友 15">
        <van-pull-refresh
          v-model="friendsIndirect.isRefreshing"
          @refresh="onRefresh('friendsIndirect')"
        >
          <template v-if="friendsIndirect.data">
            <van-list
              v-model:loading="friendsIndirect.isLoading"
              finished-text="没有更多了~"
              :finished="friendsIndirect.isFinished"
              :offset="50"
              :immediate-check="false"
              @load="onLoad('friendsIndirect')"
            >
              <template v-if="friendsIndirect.data.length > 0">
                <FriendsItem
                  v-for="(item, index) in friendsIndirect.data"
                  :key="index"
                  :data="item"
                />
              </template>
              <no-data v-else />
            </van-list>
          </template>
          <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watchEffect } from 'vue';
import AppHeader from 'comps/@lgs/AppHeader/AppHeader.vue';
import NoData from '@/components/@lgs/NoData/NoData.vue';
import FriendsItem, { FriendsItemType } from './FriendsItem.vue';
import api from '@/api';
import Tools from 'lg-tools';

// ==> props
interface TabProps extends GD.ListProps<FriendsItemType[] | null> {
  queryFriendType: number; // 查询好友的类型 1, 直邀 2, 间接
}

interface StateProps {
  friendsDirect: TabProps;
  friendsIndirect: TabProps;
  active: number;
}

type TabKeyType = 'friendsDirect' | 'friendsIndirect';

// ==> state
const state = reactive<StateProps>({
  friendsDirect: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: 'refresh',
    queryFriendType: 1,
  },
  friendsIndirect: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: 'refresh',
    queryFriendType: 2,
  },
  active: 0,
});

// ==> constants
// => 微信环境 无导航栏
// => 非微信环境 有导航栏
const env = Tools.getEnv();
const showStatusBar = false;

// ==> methods
const getDataSource = (key: TabKeyType) => {
  api.test
    .friends<GD.BaseResponse<FriendsItemType[]>>({
      page: state[key].page,
      pageSize: 10,
      queryFriendType: state[key].queryFriendType,
    })
    .then((res) => {
      if (res && res.code === 0) {
        const { pageNo, pages } = res.page;
        // 处理数据
        if (state[key].type === 'refresh' || state[key].data === null) {
          state[key].data = res.data;
          state[key].isRefreshing = false;
        } else {
          state[key].data = [...state[key].data!, ...res.data];
          state[key].isLoading = false;
        }
        state[key].isFinished = pageNo >= pages;
      }
    });
};

// ==> events
const onRefresh = (key: TabKeyType) => {
  state[key].page = 1;
  state[key].type = 'refresh';
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};
const onLoad = (key: TabKeyType) => {
  state[key].page += 1;
  state[key].type = 'load';
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};
// ==> watchEffects
watchEffect(() => {
  switch (state.active) {
    case 0:
      state['friendsDirect'].data === null && getDataSource('friendsDirect');
      break;
    case 1:
      state['friendsIndirect'].data === null &&
        getDataSource('friendsIndirect');
      break;
  }
});

// ==> toRefs
const { friendsDirect, friendsIndirect, active } = toRefs(state);
</script>

<style lang="less" scoped>

:deep(.van-tabs__wrap) {
  height: 50px;
  position: fixed;
  left: 0;
  z-index: 999;
  width: 100%;
}
:deep(.van-tabs__content) {
  margin-top: 50px;
}
</style>
