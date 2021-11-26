/*
 * @Author: Li-HONGYAO
 * @Date: 2021-06-14 19:10:42
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-04 15:51:40
 * @Description:
 */
import Mock from 'mockjs';
export default [
  // 首页 -- 任务配置
  {
    url: '/test/task',
    method: 'POST',
    response: () => ({
      code: 0,
      data: {
        signStatus: 0,
        count: 3700,
        amount: 0.37,
        videoCount: 24,
        residueCount: 24,
        videoSubTitle: '看视频得金币',
        inviteSubTitle: '每邀请1人激活账号，奖励1000金币',
        treasureSubTitle: '最高开出价值188元现金',
        treasureStatus: 1,
      },
    }),
  },
  // 金币明细 - 列表
  {
    url: '/test/goldCoins',
    method: 'POST',
    response: (req) => {
      const { page, pageSize } = req.body;
      return Mock.mock({
        code: 0,
        'data|15': [
          {
            'title|1': ['金币大转盘奖励', '好友帮我赚', '金币提现'],
            date: "@datetime('yyyy-MM-dd HH:mm:ss')",
            'count|0-1000': 1000,
            'status|1': [0, 1],
            failMsg:
              '按理说马拉松山卡拉啦塞拉斯拉拉手了按理说拉伸拉伸拉伸拉上按时',
          },
        ],
        page: {
          pageNo: page,
          pageSize,
          pages: 3,
        },
      });
    },
  },
  // -- 预估到账
  {
    url: '/test/estimatedAccount',
    method: 'POST',
    response: (req) => {
      const { page, pageSize } = req.body;
      return Mock.mock({
        code: 0,
        'data|15': [
          {
            date: "@datetime('yyyy-MM-dd')",
            'count|0-1000': 1000,
            'earnings|0-1000': 1000,
          },
        ],
        page: {
          pageNo: page,
          pageSize,
          pages: 3,
        },
      });
    },
  },
  // - 累计收入
  {
    url: '/test/accumulatedIncome',
    method: 'POST',
    response: (req) => {
      const { page, pageSize } = req.body;
      return Mock.mock({
        code: 0,
        'data|15': [
          {
            'title|1': ['宝箱奖励', '订单佣金到账'],
            date: "@datetime('yyyy-MM-dd HH:mm:ss')",
            'amount|0-100': 1000,
          },
        ],
        page: {
          pageNo: page,
          pageSize,
          pages: 3,
        },
      });
    },
  },
  {
    url: '/test/info',
    method: 'GET',
    response: (req: any) => {
      return Mock.mock({
        code: 0,
        data: {
          name: '@cname',
          'age|20-50': 50,
          'gender|1': ['男', '女'],
          avatar: "@Image('30x30','@color')",
          'friends|10': [
            {
              avatar: "@Image('30x30','@color')",
              name: '@cname',
              date: "@datetime('yyyy-MM-dd HH:mm')",
            },
          ],
        },
      });
    },
  },
  {
    url: '/test/records',
    method: 'POST',
    response: (req: any) => {
      const { page, pageSize } = req.body;
      return Mock.mock({
        code: 0,
        'data|15': [
          {
            'paymentStatus|1': [0, 1, 2],
            'amount|1-100': 100,
            withdrawTime: '@datetime("yyyy-MM-dd HH:mm")',
          },
        ],
        page: {
          pageNo: page,
          pageSize,
          pages: 3,
          total: 30,
        },
      });
    },
  },
  {
    url: '/test/queryFriends',
    method: 'POST',
    response: (req: any) => {
      const { page, pageSize } = req.body;
      return Mock.mock({
        code: 0,
        'data|15': [
          {
            avatar: "@Image('30x30','@color')",
            nickName: '@cname',
            'activeStatus|1': [0, 1],
          },
        ],
        page: {
          pageNo: page,
          pageSize,
          pages: 3,
          total: 30,
        },
      });
    },
  },
];
