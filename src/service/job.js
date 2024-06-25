const parallel = require('async/parallel');

const logger = require('../libs/logger');
const emailer = require('../libs/emailer');
const v2free = require('../remote/v2free');
const juejin = require('../remote/juejin');

const {
  smtp: { user },
} = require('../config').remote;

const sendEmail = async (payloads) => {
  const payload = {
    from: user,
    to: user,
    subject: 'daily-attendance',
    text: JSON.stringify(payloads, null, 2),
    //   html: '<p>HTML version of the message</p>',
  };

  return emailer.sendMail(payload);
};

const funcsMap = {
  // TODO: v2free增加机器人校验，后面再看看怎么处理...
  // 'v2free.checkIn': v2free.checkIn,
  'juejin.drawLottery': juejin.drawLottery,
};

const wrapper = (funcName) => {
  const fn = funcsMap[funcName];

  return [
    funcName,
    async () => {
      try {
        const result = await fn();
        return result;
      } catch (err) {
        return err;
      }
    },
  ];
};

const run = async () => {
  logger.info({ msg: 'service,run,start' });
  const results = await parallel(
    Object.fromEntries(Object.keys(funcsMap).map(wrapper))
  );

  await sendEmail(results);
  logger.info({ msg: 'service,run,end' });
};

module.exports = { sendEmail, run };
