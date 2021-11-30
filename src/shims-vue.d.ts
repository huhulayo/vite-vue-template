/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-22 10:01:11
 * @LastEditTime: 2021-11-30 20:22:20
 * @LastEditors: Lee
 * @Description: 
 */

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
