const { readFileSync } = require('node:fs');

exports.remote = {
  v2free: {
    headers: {
      cookie: process.env.V2FREECK || readFileSync('private/v2freeCk'),
    },
    host: 'https://w1.v2free.top',
    checkIn: '/user/checkin',
  },
  juejin: {
    headers: {
      cookie: process.env.JUEJINCK || readFileSync('private/juejinCk'),
    },
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
    user: 'ayumijehad@qq.com',
    password: process.env.SMTPPASSWORD || readFileSync('private/smtpPassword'),
  },
};

exports.const = {
  cron: {
    healthCheck: '*/1 * * * *',
    jobs: '*/1 * * * *',
  },
};
