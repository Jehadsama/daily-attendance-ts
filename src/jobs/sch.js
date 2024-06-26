const moment = require('moment');
const schedule = require('node-schedule');

const { cron } = require('../config').const;
const { run } = require('../service/job');

console.log('ENV:', process.env.NODE_ENV || 'dev', cron);

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
  [run].forEach((fn) => ticktock(cron.jobs, fn));
};

if (require.main === module) {
  running();
}
