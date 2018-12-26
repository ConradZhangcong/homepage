/**
 * 连接数据库
 */
const config = require('../config.default.js')
const mongoose = require('mongoose');
const dbUrl = config.dbUrl;

// 连接
mongoose.connect(dbUrl);

// 连接成功
mongoose.connection.on('connected', function () {
  console.log('连接成功' + dbUrl);
});

// 连接异常
mongoose.connection.on('error', function (err) {
  console.log('连接异常: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function () {
  console.log('连接断开');
});

module.exports = mongoose;