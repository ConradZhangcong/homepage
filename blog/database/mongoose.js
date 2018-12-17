const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/blog';

// 连接
mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', function () {
  console.log('连接成功' + DB_URL);
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