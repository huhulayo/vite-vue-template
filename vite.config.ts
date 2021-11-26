/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:20:41
 * @LastEditTime: 2021-11-26 23:40:06
 * @LastEditors: Lee
 * @Description:
 */
import { defineConfig } from "vite";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  // 部署二级目录基础路径
  // base:"/YOUR_PROJECT_NAME/"
  // 构建相关
  build: {
    outDir: "YOUR_PROJECT_NAME",
  },
  // 路径解析
  resolve: {
    alias: {
      "@": resolve("./src"),
      comps: resolve("./src/components"),
      pages: resolve("./src/pages"),
      utils: resolve("./src/utils"),
    },
  },
  plugins: [
    vue(),
    // 浏览器兼容
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    // mock
    viteMockServe({})
  ],
});
