<!--
 * @Author: Lee
 * @Date: 2021-11-03 11:42:58
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-09 10:09:29
-->
<template>
  <div class="page">
    <!-- 渐变层 -->
    <div class="gradient"></div>
    <!-- 导航栏 -->
    <app-header
      title="金币明细"
      theme="light"
      backgroundColor="transparent"
      :showBack="true"
    />
    <!-- 内容 -->
    <div class="contents">
      <van-tabs v-model:active="active" sticky offset-top="100px">
        <van-tab title="金币收入">
          <div class="wrap">
            <van-pull-refresh
              v-model="incomeTab.isRefreshing"
              @refresh="onRefresh('incomeTab')"
            >
              <template v-if="incomeTab.data">
                <van-list
                  v-model:loading="incomeTab.isLoading"
                  finished-text="没有更多了~"
                  :finished="incomeTab.isFinished"
                  :offset="50"
                  :immediate-check="false"
                  @load="onLoad('incomeTab')"
                >
                  <template v-if="incomeTab.data.length > 0">
                    <Item
                      v-for="(item, index) in incomeTab.data"
                      :key="index"
                      :data="item"
                    />
                  </template>
                  <no-data tips="没有更多啦~" v-else />
                </van-list>
              </template>
              <van-loading v-else vertical>加载中...</van-loading>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="好友贡献">
          <div class="wrap">
            <van-pull-refresh
              v-model="contributionTab.isRefreshing"
              @refresh="onRefresh('contributionTab')"
            >
              <template v-if="contributionTab.data">
                <van-list
                  v-model:loading="contributionTab.isLoading"
                  finished-text="没有更多了~"
                  :finished="contributionTab.isFinished"
                  :offset="50"
                  :immediate-check="false"
                  @load="onLoad('contributionTab')"
                >
                  <template v-if="contributionTab.data.length > 0">
                    <Item
                      v-for="(item, index) in contributionTab.data"
                      :key="index"
                      :data="item"
                    />
                  </template>
                  <no-data tips="没有更多啦~" v-else />
                </van-list>
              </template>
              <van-loading v-else vertical>加载中...</van-loading>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="金币支出">
          <div class="wrap">
            <van-pull-refresh
              v-model="spendingTab.isRefreshing"
              @refresh="onRefresh('spendingTab')"
            >
              <template v-if="spendingTab.data">
                <van-list
                  v-model:loading="spendingTab.isLoading"
                  finished-text="没有更多了~"
                  :finished="spendingTab.isFinished"
                  :offset="50"
                  :immediate-check="false"
                  @load="onLoad('spendingTab')"
                >
                  <template v-if="spendingTab.data.length > 0">
                    <Item
                      v-for="(item, index) in spendingTab.data"
                      :key="index"
                      :data="item"
                    />
                  </template>
                  <no-data tips="没有更多啦~" v-else />
                </van-list>
              </template>
              <van-loading v-else vertical>加载中...</van-loading>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import AppHeader from "comps/@lgs/AppHeader/AppHeader.vue";
import NoData from "comps/@lgs/NoData/NoData.vue";
import Item from "comps/ListItem.vue";
import api from "@/api";

interface TabProps extends GD.ListProps<any[] | null> {
  queryType: number; // 查询类型 1-金币收入 2-好友贡献 3-金币支出
}
interface StateProps {
  active: number;
  incomeTab: TabProps;
  spendingTab: TabProps;
  contributionTab: TabProps;
}
type TabKeyType = "incomeTab" | "spendingTab" | "contributionTab";

export default defineComponent({
  components: {
    AppHeader,
    NoData,
    Item,
  },
  setup() {
    // state
    const state = reactive<StateProps>({
      active: 0,
      incomeTab: {
        page: 1,
        data: null,
        isRefreshing: false,
        isLoading: false,
        isFinished: false,
        type: "refresh",
        queryType: 1,
      },
      spendingTab: {
        page: 1,
        data: null,
        isRefreshing: false,
        isLoading: false,
        isFinished: false,
        type: "refresh",
        queryType: 1,
      },
      contributionTab: {
        page: 1,
        data: null,
        isRefreshing: false,
        isLoading: false,
        isFinished: false,
        type: "refresh",
        queryType: 1,
      },
    });
    // methods
    const getDataSource = (key: TabKeyType) => {
      api.test
        .goldCoins<GD.BaseResponse<GD.ListItemProps[]>>({
          page: state[key].page,
          pageSize: 20,
        })
        .then((res) => {
          if (res && res.code === 0) {
            const { pageNo, pages } = res.page;
            // 处理数据
            if (state[key].type === "refresh" || state[key].data === null) {
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
    // watchEffects
    watchEffect(() => {
      switch (state.active) {
        case 0:
          state["incomeTab"].data === null && getDataSource("incomeTab");
          break;
        case 1:
          state["contributionTab"].data === null &&
            getDataSource("contributionTab");
          break;
        case 2:
          state["spendingTab"].data === null && getDataSource("spendingTab");
          break;
      }
    });
    // events
    const onRefresh = (key: TabKeyType) => {
      state[key].page = 1;
      state[key].type = "refresh";
      setTimeout(() => {
        getDataSource(key);
      }, 1000);
    };
    const onLoad = (key: TabKeyType) => {
      state[key].page += 1;
      state[key].type = "load";
      setTimeout(() => {
        getDataSource(key);
      }, 1000);
    };
    return {
      ...toRefs(state),
      onRefresh,
      onLoad,
    };
  },
});
</script>


<style lang="less" scoped>
// 渐变层
.gradient {
  height: 159px;
  background: linear-gradient(180deg, #4fb4ed 0%, rgba(77, 219, 216, 0) 100%);
}
// 内容
.contents {
  width: calc(100% - 24px);
  margin: -60px auto 0;
  background-color: #fff;
  // 容器高度 - 渐变成高度 - 向上位移高度 - 距离底部的间距（10px）
  height: calc(100% - 159px + 60px - 10px);
  border-radius: 10px;
  overflow: hidden;
}
.wrap {
  // 容器高度 - 渐变成高度
  height: calc(100vh - 159px);
  margin-top: 1px;
  overflow-y: scroll;
}
// 定制tabs样式
:deep(.van-tabs) {
  .van-tabs__wrap {
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #97979720;
    .van-tab__text {
      font-size: 15px;
      color: #00000050;
    }
    .van-tab--active .van-tab__text {
      color: #000000;
    }
    .van-tabs__line {
      width: 61px;
      height: 2px;
      background-color: #4fb4ec;
    }
  }
}

:deep(.van-pull-refresh) {
  min-height: 200px;
  padding-bottom: 30px;
}
</style>