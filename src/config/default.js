exports.remote = {
  v2free: {
    host: 'https://w1.v2free.top',
    checkIn: '/user/checkin',
  },
  juejin: {
    host: 'https://api.juejin.cn',
    checkIn: '/growth_api/v1/check_in',
    getLotteryConfig: '/growth_api/v1/lottery_config/get',
    drawLottery: '/growth_api/v1/lottery/draw',
    getLuckyUserList: '/growth_api/v1/lottery_history/global_big',
    dipLucky: '/growth_api/v1/lottery_lucky/dip_lucky',
  },
  smtp: {
    host: 'smtp.qq.com',
    port: '587',
    from: 'ayumijehad@qq.com',
    password: '',
  },
};

exports.const = {
  cron: '*/1 * * * *',
};
