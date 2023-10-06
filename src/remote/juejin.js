const _ = require('lodash');
const Boom = require('@hapi/boom');
const { readFile } = require('node:fs/promises');

const axios = require('../lib/axios');
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
    headers: {
      cookie: process.env.JUEJINCK || (await readFile('private/juejinCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

// 获取幸运用户列表
const getLuckyUserList = async () => {
  const opt = {
    method: 'post',
    url: `${API.host}${API.getLuckyUserList}`,
    headers: {
      cookie: process.env.JUEJINCK || (await readFile('private/juejinCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

// 沾喜气
const dipLucky = async () => {
  const opt = {
    method: 'post',
    url: `${API.host}${API.dipLucky}`,
    headers: {
      cookie: process.env.JUEJINCK || (await readFile('private/juejinCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

//获取今日免费抽奖次数
const getLotteryConfig = async () => {
  const opt = {
    method: 'get',
    url: `${API.host}${API.getLotteryConfig}`,
    headers: {
      cookie: process.env.JUEJINCK || (await readFile('private/juejinCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

// 抽奖
const drawLottery = async () => {
  const {
    data: { free_count: freeCount },
  } = await getLotteryConfig();

  if (freeCount <= 0) {
    return undefined;
  }

  const opt = {
    method: 'post',
    url: `${API.host}${API.drawLottery}`,
    headers: {
      cookie: process.env.JUEJINCK || (await readFile('private/juejinCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

module.exports = {
  checkIn,
  getLuckyUserList,
  dipLucky,
  getLotteryConfig,
  drawLottery,
};
