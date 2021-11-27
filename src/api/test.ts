/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-24 13:40:52
 * @LastEditTime: 2021-11-27 08:51:48
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \vite-vue-template__H5\src\api\test.ts
 */

import request from '../utils/request';



// 首页 - 任务
export function task<T>() {
  return request.post<T>('/test/task');
}

// 金币明细
export function goldCoins<T>(data: { page: number; pageSize: number }) {
  return request.post<T>('/test/goldCoins', data);
}

// 记录
export function records<T>(data: { page: number; pageSize: number }) {
  return request.post('/test/records', data);
}

// 好友列表
export function friends<T>(data: {
  page: number;
  pageSize: number;
  queryFriendType: number /** 查询好友的类型 1, 直邀 2, 间接 */;
}) {
  return request.post<T>('/test/queryFriends', data);
}
