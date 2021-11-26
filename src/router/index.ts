/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:24:50
 * @LastEditTime: 2021-11-27 00:05:32
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \vite-vue-template__H5\src\router\index.ts
 */

import LibForWeixin from '@/utils/LibForWeixin';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index-page',
  },
  {
    path: "/auth/:type",
    name: "Auth",
    component: () => import("pages/Auth/index.vue"),
    meta: {
      title: "",
    },
  },
  {
    path: '/index-page',
    name: 'index-page',
    component: () => import('pages/IndexPage/index.vue'),
    meta: {
      title: '赚赚',
      isTabPage: true,
      isKeepAlive: true,
      jsApiList: ["getLocation"],
    },
  },
  {
    path: '/special-sale',
    name: 'special-sale',
    component: () => import('pages/SpecialSale/index.vue'),
    meta: {
      title: '特卖',
      isTabPage: true,
      isKeepAlive: true,
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: () => import('pages/Friends/index.vue'),
    meta: {
      title: '好友',
      isTabPage: true,
      isKeepAlive: true,
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('pages/Mine/index.vue'),
    meta: {
      title: '我的',
      isTabPage: true,
      isKeepAlive: true,
    },
  },
  {
    path: '/gold-coin-withdraw',
    name: 'gold-coin-withdraw',
    component: () => import('pages/GoldCoinWithdraw/index.vue'),
    meta: {
      title: '金币提现',
    },
  },
  {
    path: '/gold-coin-details',
    name: 'gold-coin-details',
    component: () => import('pages/GoldCoinDetails/index.vue'),
    meta: {
      title: '金币明细',
    },
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('pages/Wallet/index.vue'),
    meta: {
      title: '我的钱包',
    },
  },
  {
    path: '/wallet-withdraw',
    name: 'wallet-withdraw',
    component: () => import('pages/WalletWithdraw/index.vue'),
    meta: {
      title: '钱包提现',
    },
  },
  {
    path: '/wallet-estimated-account',
    name: 'wallet-estimated-account',
    component: () => import('pages/WalletEstimatedAccount/index.vue'),
    meta: {
      title: '预估到账',
    },
  },
  {
    path: '/wallet-accumulated-income',
    name: 'wallet-accumulated-income',
    component: () => import('pages/WalletAccumulatedIncome/index.vue'),
    meta: {
      title: '累计收入',
    },
  },

  {
    path: '/download',
    name: 'download',
    component: () => import('pages/Download/index.vue'),
    meta: {
      title: '下载',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('pages/Test/index.vue'),
    meta: {
      title: '测试',
    },
  },
  {
    path: '/list-page',
    name: 'ListPage',
    component: () => import('pages/ListPage/index.vue'),
    meta: {
      title: '列表页',
    },
  },
  {
    path: '/tab-page',
    name: 'TabPage',
    component: () => import('pages/TabPage/index.vue'),
    meta: {
      title: '标签页',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('pages/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  // 部署二级目录：createWebHistory(base?: string)
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  // 1. 设置标题
  if (to.path !== '/favicon.icon') {
    document.title = to.meta.title ? (to.meta.title as string) : '';
  }
  // 2.判断是否加载JSSDK
  if (to.meta.jsApiList) {
    LibForWeixin.initJSSDK(to.meta.jsApiList as string[])
      .then(() => {
        console.log("config JS-SDK success");
        next();
      })
      .catch(() => {
        console.log("config JS-SDK fail");
        next();
      });
  } else {
    next();
  }

});

router.afterEach(() => {
  window.scrollTo(0, 0);
})

export default router;
