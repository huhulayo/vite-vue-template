<!--
 * @Author: Lee
 * @Date: 2021-11-04 13:49:26
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-21 20:38:22
-->
<template>
  <div class="page">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <!-- 导航栏 -->
      <app-header
        title="我的钱包"
        gradientColor="linear-gradient(132deg, #FEE8D1 0%, #F8D3A8 100%)"
        :showBack="true"
      />
      <!-- 顶栏 -->
      <div class="top-bar position-relative">
        <div class="flex-h-start">
          <img class="icon-wallet mr-9" src="../../assets/icon_wallet.png" />
          <span class="f17 lh-20 color-555555">可提现(元)</span>
        </div>
        <div class="flex-h-between mt-21">
          <div class="f34 ff-DIN-Bold">35.11</div>
          <div
            class="withdraw-button flex-h-center"
            @click="$router.push('/wallet-withdraw')"
          >
            立即提现
          </div>
        </div>
        <!-- 预估到账 && 累计收入 -->
        <div class="info absolute-bottom w-100 flex-h-center">
          <div
            class="flex-1 lh-20 pl-22"
            @click="$router.push('/wallet-estimated-account')"
          >
            <div class="f13 color-555555 mb-6">预估到账(元)</div>
            <div class="f20 ff-DIN-Bold">
              35.11
              <img
                class="icon-12x12"
                src="../../assets/icon_arrow_right_3.png"
              />
            </div>
          </div>
          <div class="line"></div>
          <div
            class="flex-1 lh-20 pl-22"
            @click="$router.push('/wallet-accumulated-income')"
          >
            <div class="f13 color-555555 mb-6">累计收入(元)</div>
            <div class="f20 ff-DIN-Bold">
              35.11
              <img
                class="icon-12x12"
                src="../../assets/icon_arrow_right_3.png"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 提现记录 -->
      <div class="bg-FFFFFF">
        <div
          class="mt-7 lh-61 pl-22 f16 bg-FFFFFF border-bottom"
          style="color: #5a5a5a"
        >
          提现记录
        </div>

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
              <Item
                class="item"
                v-for="(item, index) in data"
                :key="index"
                :data="item"
              >
              </Item>
            </template>
            <no-data v-else />
          </van-list>
        </template>
        <van-loading v-else vertical style="margin-top: 30px"
          >加载中...</van-loading
        >
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import AppHeader from "comps/@lgs/AppHeader/AppHeader.vue";
import NoData from "@/components/@lgs/NoData/NoData.vue";
import Item from "../../components/ListItem.vue";
import api from "@/api";
interface StateProps extends GD.ListProps<GD.ListItemProps[] | null> {}

export default defineComponent({
  components: {
    AppHeader,
    NoData,
    Item,
  },
  setup() {
    // state
    const state = reactive<StateProps>({
      page: 1,
      data: [],
      type: "refresh",
      isRefreshing: false,
      isLoading: false,
      isFinished: false,
    });
    // methods
    const getDataSource = () => {
      api.test
        .goldCoins<GD.BaseResponse<GD.ListItemProps[]>>({
          page: state.page,
          pageSize: 20,
        })
        .then((res) => {
          if (res && res.code === 0) {
            const { pageNo, pages } = res.page;
            // 处理数据
            if (state.type === "refresh" || state.data === null) {
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
      state.type = "refresh";
      setTimeout(() => {
        getDataSource();
      }, 1000);
    };
    const onLoad = () => {
      state.page += 1;
      state.type = "load";
      setTimeout(() => {
        getDataSource();
      }, 1000);
    };
    onMounted(() => {
      getDataSource();
    });
    return {
      ...toRefs(state),
      onRefresh,
      onLoad,
    };
  },
});
</script>

<style lang="less" scoped>
.page {
  background: #f4f4f4;
}
.top-bar {
  height: 293px;
  padding: 90px 17px 0 22px;
  background: linear-gradient(132deg, #fee8d1 0%, #f8d3a8 100%);
  .icon-wallet {
    width: 16px;
    height: 17px;
  }
  .withdraw-button {
    width: 97px;
    height: 33px;
    border-radius: 17px;
    border: 1px solid #3f3f3f;
    font-size: 15px;
    font-weight: 600;
    color: #000000;
  }
  .info {
    height: 87px;
    background: #ffffff30;
    .line {
      width: 1px;
      height: 47px;
      background: #00000030;
    }
  }
}
</style>