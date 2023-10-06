/* eslint-disable no-console */
const { nanoid } = require('nanoid');
const _ = require('lodash');
const Axios = require('axios');
const logger = require('./logger');

// @ts-ignore
const axios = Axios.create({
  validateStatus: () => true,
  timeout: 10000,
});

// request logs
axios.interceptors.request.use((config) => {
  config.id = nanoid();
  logger.info({
    ..._.pick(config, ['id', 'baseURL', 'url', 'params']),
    msg: 'remote,request',
  });
  return config;
});
axios.interceptors.response.use((res) => {
  const data = res.config.url.includes('.jpg') ? {} : _.get(res, 'data');
  logger.info({
    ..._.pick(res, ['config.id', 'status', 'headers']),
    data,
    msg: 'remote,response',
  });
  return res;
});

module.exports = axios;
