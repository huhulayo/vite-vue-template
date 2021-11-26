/*
 * @Author: Li-HONGYAO
 * @Date: 2021-03-08 21:31:00
 * @LastEditTime: 2021-06-01 18:07:23
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \vite-vue-template__H5\src\hooks\useTitle.ts
 */
export default function (title: string) {
  // 兼容微信环境
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    const i = document.createElement("iframe");
    i.src = "/";
    i.style.display = "none";
    i.onload = () => {
      document.title = title;
      setTimeout(() => {
        i.remove();
      }, 0);
    };
    document.body.appendChild(i);
  } else {
    document.title = title;
  }
}
