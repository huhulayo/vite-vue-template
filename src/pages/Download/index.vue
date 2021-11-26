<!--
 * @Author: Li-HONGYAO
 * @Date: 2021-06-01 20:00:49
 * @LastEditTime: 2021-06-03 10:28:56
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: \vite-vue-template__H5\src\pages\Download\index.vue
-->

<template>
  <div class="page">
    <!-- 内容区域 -->
    <div class="wrap">
      <img src="./images/icon_logo.png" class="icon-70x70" />
      <div class="platform">
        <img
          v-if="platform === 'android'"
          src="./images/icon_android.png"
          class="icon-env"
        />
        <img
          v-if="platform === 'ios'"
          src="./images/icon_ios.png"
          class="icon-env"
        />
        <span class="app-name">多多汇宝</span>
      </div>
      <div class="download-button" @click="onDownload">即将开放</div>
      <!-- <div v-if="platform !== 'weixin'" class="open-tips" @click="onOpenApp">
        已安装?立即打开
      </div> -->
    </div>
    <!-- 微信环境文案提示 -->
    <img
      :class="`tips ${platform === 'weixin' ? 'show' : ''} ${ani}`"
      src="./images/tips.png"
    />
  </div>
</template>

<script lang="ts">
import Tools from "lg-tools";
import { defineComponent, reactive, toRefs } from "vue";

interface StateProps {
  platform: "ios" | "android" | "weixin" | "unknown";
  ani: string;
}

export default defineComponent({
  setup() {
    const state = reactive<StateProps>({
      // @ts-ignore
      platform: Tools.getEnv(),
      ani: "",
    });

    // events
    const onDownload = () => {
      switch (state.platform) {
        case "ios":
          break;
        case "android":
          break;
        case "weixin":
          state.ani = "ani";
          setTimeout(() => {
            state.ani = "";
          }, 1000);
          break;
        case "unknown":
          break;
      }
    };
    const onOpenApp = () => {
      return;
      window.location.href = "ddou://www.d-dou.com/";
    };

    return {
      ...toRefs(state),
      onDownload,
      onOpenApp,
    };
  },
});
</script>

<style lang="less" scoped>
.page {
  background: #fdc401 url("./images/bg.png") no-repeat top left;
  background-size: contain;
  padding-top: 434px;
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .platform {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .icon-env {
    width: 12px;
    height: 15px;
    margin-right: 5px;
  }
  .app-name {
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    color: #ffffff;
  }
  .download-button {
    width: 211px;
    height: 40px;
    background: #ffffff;
    margin-top: 17px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    color: #333333;
    font-size: 15px;
  }
  .open-tips {
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
    color: #fb4545;
  }
  .tips {
    display: none;
    width: 160px;
    position: absolute;
    right: 6px;
    top: 0;
    &.show {
      display: block;
    }
    &.ani {
      animation: debounce 1s;
    }
  }
}
</style>

