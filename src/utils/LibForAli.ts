/*
 * @Author: Lee
 * @Date: 2021-08-20 12:33:26
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-26 23:38:56
 */
export interface AlipayLocationProps {
  longitude: string;
  latitude: string;
  country: string;
  city: string;
  pois: {
    address: string;
    name: string;
  }[];
  streetNumber: {
    number: string;
    street: string;
  };
}

class LibForAli {
  private static instance: LibForAli;
  private constructor() {}
  static defaultWXSDK() {
    if (!this.instance) {
      this.instance = new LibForAli();
    }
    return this.instance;
  }

  public static isIntalled(callback: Function) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
      callback && callback();
    } else {
      // 如果没有注入则监听注入的事件
      // @ts-ignore
      window.document.addEventListener("AlipayJSBridgeReady", callback, false);
    }
  }
}
export default LibForAli;
