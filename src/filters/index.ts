/*
 * @Author: your name
 * @Date: 2021-06-07 17:24:12
 * @LastEditTime: 2021-11-30 20:21:47
 * @LastEditors: Lee
 * @Description: In User Settings Edit
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

