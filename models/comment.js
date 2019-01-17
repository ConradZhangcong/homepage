const moment = require('moment')
const mongoose = require('mongoose')
const BaseModel = require('./baseModel')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

require('./user')

/* 评论实体 */
const CommentSchema = new Schema(
  {
    articleId: { type: ObjectId, ref: 'Article' }, // 文章id
    fromUId: { type: ObjectId, ref: 'User' }, // 发出评论者的id
    toUId: { type: ObjectId }, // 回复他人的id
    content: { type: String }, // 评论内容
    state: { type: Number, default: 2 }, // 评论状态 0:通过不审核 1:审核通过 2:待审核
    deleted: { type: Boolean, default: false }, // 评论是否删除 false:未删除 true:已删除
    createTime: {
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    }, // 发起评论的时间
    modifyTime: {
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    timestamps: { createdAt: 'createTime', updatedAt: 'modifyTime' }
  }
)

CommentSchema.plugin(BaseModel)
CommentSchema.index({ articleId: -1 })
CommentSchema.index({ fromUId: -1 })
CommentSchema.index({ toUId: -1 })

const Comment = mongoose.model('Comment', CommentSchema)
