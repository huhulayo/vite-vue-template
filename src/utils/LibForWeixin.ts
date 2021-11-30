/*
 * @Author: Li-HONGYAO
 * @Date: 2021-06-18 15:23:59
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-30 20:47:56
 * @Description: 微信Api
 */


import api from '@/api';
import Validator from 'lg-validator';

/**
 * 后端返回的初始化JS-SDK所需要的配置类型
 */
interface JSSDKConfigPorps {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
}

class LibForWeixin {
  private static instance: LibForWeixin;
  private constructor() {}
  static defaultWXSDK() {
    if (!this.instance) {
      this.instance = new LibForWeixin();
    }
    return this.instance;
  }

  /**
   * 微信授权
   * @param options
   */
  public static auth(options: {
    appid: string /** 微信id */;
    base?: string /** 基路径，部署二级目录时传入，如二级目录名为“H5”，则传入的值为：“/H5/” */;
    state?: string /** 携带回传参数 */;
    path?: string /** 回调path，默认：/auth/callback */;
    scope?: 'snsapi_userinfo' | 'snsapi_base' /** 授权scope，snsapi_userinfo（用户信息）/ snsapi_base（静默授权）默认：snsapi_userinfo */;
  }) {
    // 1. 解构参数
    let {
      appid,
      state,
      base,
      path = '/auth/callback',
      scope = 'snsapi_userinfo',
    } = options;
    // 2. 解析redirect_uri
    let redirect_uri = encodeURIComponent(
      `${window.location.origin}${
        base ? base.slice(0, base.length - 1) : ''
      }${path}`
    );
    // 3. 跳转授权页
    window.location.replace(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${
        state ? encodeURIComponent(state) : ''
      }#wechat_redirect`
    );
  }

  /**
   * 注册JS-SDK
   * @param jsApiList // 需要使用的JS接口列表
   * @returns
   */
  public static initJSSDK(jsApiList: string[]) {
    return new Promise((resolve, reject) => {
      // 1. 处理url（注：iOS 需拿到进入时的URL，已动态记录存入全局window对象，key值为：CONFIG_URL_FOR_IOS）
      let url = '';
      if (Validator.ios()) {
        url = window.CONFIG_URL_FOR_IOS;
      } else {
        url = window.location.href;
      }
      resolve(null); // 临时代码
      // 2. 调用后端接口获取config必要信息
      /*
       api.jssdk
         .getConfigs<GD.BaseResponse<JSSDKConfigPorps>>({
           url,
         })
         .then((res) => {
           if (res && res.status === 200) {
             const { appId, timestamp, nonceStr, signature } = res.data;
             window.wx.config({
               debug: import.meta.env.MODE === "dev",
               appId,
               timestamp,
               nonceStr,
               signature,
               jsApiList,
             });
             window.wx.ready(() => {
               resolve(null);
             });
             window.wx.error((err: any) => {
               reject(err);
             });
           }
         })
         .catch(() => {
           reject();
         });*/
    });
  }
}

export default LibForWeixin;
