const _ = require('lodash');
const Boom = require('@hapi/boom');
const { readFile } = require('node:fs/promises');

const axios = require('../lib/axios');
const { v2free: API } = require('../config').remote;

const parseRes = (body, res) => {
  const { status } = res;
  if (status === 200) {
    return body;
  }

  const msg = _.get(body, 'msg', 'connect v2free from remote fail');
  throw new Boom.Boom(msg, {
    data: { code: _.get(body, 'ret', status) },
    status,
  });
};

const checkIn = async () => {
  const opt = {
    method: 'post',
    url: `${API.host}${API.checkIn}`,
    headers: {
      cookie: process.env.V2FREECK || (await readFile('private/v2freeCk')),
    },
  };
  const res = await axios(opt);
  return parseRes(res.data, res);
};

module.exports = { checkIn };
