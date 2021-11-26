/*
 * @Author: Li-HONGYAO
 * @Date: 2021-03-26 22:51:19
 * @LastEditTime: 2021-11-26 23:38:07
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \vite-vue-template__H5\src\typings\index.d.ts
 */

import { AxiosRequestConfig } from "axios";
import { FiltersProps } from '@/filters';
export {};


/**
 * 1. axios 模块定义
 */

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any> (config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

/**
 * 2. vue 全局属性定义
 */
 declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filters: FiltersProps;
  }
}


/**
 * 3. 全局类型声明
 */
declare global {
  interface Window {
    _hmt: any;
    wx: any;
    AMap: any;
    qq: any;
    AlipayJSBridge: any;
    CONFIG_URL_FOR_IOS: string;
  }
  namespace GD {

    interface BaseResponse<T = any> {
      code: number;
      data: T;
      msg: string;
      page: {
        pageNo: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      success: boolean;
    }

    /**
     * 列表数据类型
     */
    interface ListProps<T = any> {
      page: number; 
      data: T; 
      type: "refresh" | "load"; 
      isRefreshing: boolean; 
      isLoading: boolean; 
      isFinished: boolean;
    }

     /** 钱包 */
     interface WalletProps {
      cashAmount: number /** 钱包金额(元) */;
      coinAmount: number /** 金币余额 */;
      coinCny: number /** 金币约等于多少人民币 */;
      estimateAmount: number /** 预估到账金额 */;
      accWithdrawAmount: number /** 累计提现金额 */;
      activeStatus: number; /** 是否激活 0-未激活 1-激活 */
    }
    /**
     * 提现金额配置
     */
    interface WithdrawConfigItemProps {
      arrivedSec: boolean /** 是否秒到账 */;
      feeRate: number /** 手续费 */;
      money: number /** 提现金额 */;
      repeatable: boolean /** 是否可重复提 */;
    }
    /** 提现配置 */
    interface WithdrawConfigProps {
      amounts: WithdrawConfigItemProps[];
      desc: string /** 提现说明 */;
    }

    interface ListItemProps {
      title: string;
      date: string;
      count: number;
      status: number;
      failMsg: string;
    }
  }
}
