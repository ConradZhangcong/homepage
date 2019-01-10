const moment = require('moment');
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

moment.locale('zh-cn');

/**
 * 文章实体
 */
const articleSchema = new Schema({
  title: { type: String }, // 标题
  describe: { type: String }, // 描述
  content: { type: String }, // 内容
  classify: { type: String }, // 分类
  tags: { type: Array }, // 标签
  state: { type: Number }, // 文章状态 0:发布 1:草稿 2:删除
  author: { type: String, default: 'Conrad' }, // 作者
  reading: { type: Number, default: 0 }, // 阅读量
  comments: { type: Number, default: 0 }, // 评论
  favourite: { type: Number, default: 0 }, // 收藏
  createTime: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
  },
  modifyTime: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'modifyTime'
  }
});

module.exports = mongoose.model('Article', articleSchema);