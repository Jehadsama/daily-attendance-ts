const moment = require('moment');
const schedule = require('node-schedule');

const v2free = require('../remote/v2free');
const juejin = require('../remote/juejin');
const { cron } = require('../config').const;

const healthcheck = async () => 'daily_attendance,schedule,ok';

const ticktock = (rule, handler) => {
  schedule.scheduleJob(rule, async () => {
    const log = (description, obj = '') =>
      console.log(
        `${handler.name},${description},${moment().format(
          'YYYY-MM-DD HH:mm:ss'
        )}`,
        obj
      );
    log('running');
    await handler()
      .then((result) => {
        log('result', result);
      })
      .catch((err) => {
        log('err', err);
      });
    log('ending');
  });
};

const running = async () => {
  [healthcheck].forEach((fn) => ticktock(cron.healthCheck, fn));
  [v2free.checkIn, juejin.checkIn, juejin.dipLucky, juejin.drawLottery].forEach(
    (fn) => ticktock(cron.job, fn)
  );
};

if (!module.parent) {
  running();
}
