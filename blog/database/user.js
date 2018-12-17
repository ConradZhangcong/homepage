const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String, // 用户账号
  pwd: String, // 用户密码
  createTime: Date // 创建时间
});

module.exports = mongoose.model('User', userSchema);