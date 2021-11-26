/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:44:41
 * @LastEditTime: 2021-05-21 23:44:48
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /多多汇宝/postcss.config.js
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
    },
    "postcss-pxtorem": {
      rootValue: 37.5, // Vant 官方根字体大小是 37.5
      propList: ["*"],
      selectorBlackList: [".norem"], // 过滤掉.norem-开头的class，不进行rem转换
    },
  },
};
