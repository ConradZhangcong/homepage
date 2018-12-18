const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

/**
 * 用户实体
 */
const userSchema = new Schema({
  username: { type: String }, // 用户名
  password: { type: String }, // 用户密码
  avator: { type: String }, // 用户头像
  email: { type: String }, // 邮箱
  phone: { type: String }, // 手机号
  sex: { type: String }, // 性别
  createTime: { type: String } // 创建时间
});

module.exports = mongoose.model('User', userSchema);