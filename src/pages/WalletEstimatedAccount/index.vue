<!--
 * @Author: Lee
 * @Date: 2021-11-04 15:10:46
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-04 16:02:46
-->
<template>
  <div class="page vh-100">
    <!-- 导航栏 -->
    <app-header title="预估到账" backgroundColor="transparent" :showBack="true">
      <template v-slot:right>
        <img class="icon-19x19" src="../../assets/icon_help.png" />
      </template>
    </app-header>
    <!-- place -->
    <div class="place"></div>
    <!-- 内容 -->
    <div class="contents pl-25 pr-21">
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
                class="item flex-v-center"
                v-for="(item, index) in data"
                :key="index"
              >
                <div class="f13 lh-19 mb-6 w-100" style="color: #505050">
                  {{ item.date }}
                </div>
                <div class="w-100 flex-h-start">
                  <div class="mr-79">
                    <div class="f12 lh-17 mb-4" style="color: #41414150">
                      订单笔数
                    </div>
                    <div class="f21 lh-30 ff-DIN-Bold" style="color: #414141">
                      {{ item.count }}
                    </div>
                  </div>
                  <div>
                    <div class="f12 lh-17 mb-4" style="color: #41414150">
                      有效收益
                    </div>
                    <div class="f21 lh-30 ff-DIN-Bold" style="color: #be701b">
                      <span class="f14 mr-2">&yen;</span>
                      <span>{{ item.earnings }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <no-data v-else />
          </van-list>
        </template>
        <van-loading v-else vertical style="margin-top: 30px"
          >加载中...</van-loading
        >
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import AppHeader from "comps/@lgs/AppHeader/AppHeader.vue";
import NoData from "@/components/@lgs/NoData/NoData.vue";
import api from "@/api";

interface ItemProps {
  date: string;
  count: number;
  earnings: number;
}
interface StateProps extends GD.ListProps<ItemProps[] | null> {}

export default defineComponent({
  components: {
    AppHeader,
    NoData,
  },
  setup() {
    // state
    const state = reactive<StateProps>({
      page: 1,
      data: null,
      type: "refresh",
      isRefreshing: false,
      isLoading: false,
      isFinished: false,
    });
    // methods
    const getDataSource = () => {
      api.test
        .estimatedAccount<GD.BaseResponse<ItemProps[]>>({
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
.place {
  height: 150px;
  background: #fbdcb9;
}
.contents {
  margin: -60px auto 0;
  width: calc(100% - 13px * 2);
  height: calc(100vh - 150px + 50px);
  background: #fff;
  border-radius: 10px;
  overflow-y: scroll;
  .item {
    height: 95px;
    border-bottom: 1px solid #97979720;
  }
}
</style>