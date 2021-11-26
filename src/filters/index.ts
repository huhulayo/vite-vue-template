/*
 * @Author: your name
 * @Date: 2021-06-07 17:24:12
 * @LastEditTime: 2021-06-17 14:32:28
 * @LastEditors: Li-HONGYAO
 * @Description: In User Settings Edit
 * @FilePath: \多多汇宝\src\filters\index.ts
 */

export interface FiltersProps {
  isBangScreen: () => boolean;
}
const filters: FiltersProps = {
  isBangScreen: () => {
    return (
      window && window.screen.height >= 812 && window.devicePixelRatio >= 2
    );
  },
};
export default filters;

