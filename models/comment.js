const moment = require('moment');
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

/**
 * 评论实体
 */
const commentSchema = new Schema({
  articleId: { type: Object }, // 文章id
  fromUId: { type: Object }, // 发出评论者的id
  toUId: { type: Object }, // 回复他人的id
  content: { type: String }, // 评论内容
  createTime: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
  }, // 发起评论的时间
}, {
  timestamps: {
    createdAt: 'createTime'
  }
});

module.exports = mongoose.model('Comment', commentSchema);