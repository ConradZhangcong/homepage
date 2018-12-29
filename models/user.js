const moment = require('moment');
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

moment.locale('zh-cn');

/**
 * 用户实体
 */
const userSchema = new Schema({
  username: { type: String }, // 用户名
  email: { type: String }, // 邮箱
  password: { type: String }, // 用户密码
  userType: { type: Number, default: 1 }, // 用户类型 0:管理员 1:普通用户
  avator: { type: String }, // 用户头像
  phone: { type: String }, // 手机号
  sex: { type: String }, // 性别
  createTime: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
  }, // 注册时间
  isLocked: { type: Boolean, default: false } // 是否被封禁 默认false
}, {
  timestamps: {
    createdAt: 'createTime'
  }
});

module.exports = mongoose.model('User', userSchema);