const _ = require('lodash');
const Boom = require('@hapi/boom');

const axios = require('../libs/axios');
const { juejin: API } = require('../config').remote;

const parseRes = (body, res) => {
  const { status } = res;
  if (status === 200 && body.err_no === 0) {
    return body;
  }

  const msg = _.get(body, 'err_msg', 'connect juejin from remote fail');
  throw new Boom.Boom(msg, {
    data: { code: _.get(body, 'err_no', status) },
    status,
  });
};

// 签到
const checkIn = async () => {
  const opt = {
    method: 'post',
    url: `${API.host}${API.checkIn}`,
    headers: API.headers,
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};




//获取今日免费抽奖次数
const getLotteryConfig = async () => {
  const opt = {
    method: 'get',
    url: `${API.host}${API.getLotteryConfig}`,
    headers: API.headers,
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

// 抽奖
const drawLottery = async () => {
  await checkIn();

  const {
    data: { free_count: freeCount },
  } = await getLotteryConfig();

  if (freeCount <= 0) {
    return undefined;
  }

  const opt = {
    method: 'post',
    url: `${API.host}${API.drawLottery}`,
    headers: API.headers,
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

module.exports = {
  checkIn,
  getLotteryConfig,
  drawLottery,
};
