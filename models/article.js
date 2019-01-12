const moment = require('moment')
const mongoose = require('mongoose')
const BaseModel = require('./baseModel')
const Schema = mongoose.Schema

moment.locale('zh-cn')

/* 文章实体 */
const ArticleSchema = new Schema(
  {
    title: { type: String },
    describe: { type: String },
    content: { type: String },
    classify: { type: String },
    tags: { type: Array },
    state: { type: Number }, // 文章状态 0:草稿 1:发布 2:删除
    author: { type: String, default: 'Conrad' }, // 作者
    reading: { type: Number, default: 0 }, // 阅读量
    comments: { type: Number, default: 0 }, // 评论
    favourite: { type: Number, default: 0 }, // 收藏
    createTime: {
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    }, // 发表时间
    modifyTime: {
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    } // 修改时间
  },
  {
    timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime' }
  }
)

ArticleSchema.plugin(BaseModel)
ArticleSchema.index({ reading: -1 })

mongoose.model('Article', ArticleSchema)
