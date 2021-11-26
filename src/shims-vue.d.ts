/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-22 10:01:11
 * @LastEditTime: 2021-06-03 13:52:38
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: \vite-vue-template__H5\src\shims-vue.d.ts
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
