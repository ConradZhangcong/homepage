const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const resultUtil = require('../utils/result')

const CommentApi = require('../api/comment')

/* 发表文章的评论 */
router.post('/publish', async function(req, res, next) {
  try {
    let data = Object.assign({}, req.body)
    data.articleId = mongoose.Types.ObjectId(data.articleId)
    data.fromUId = mongoose.Types.ObjectId(data.fromUId)
    console.log(data)
    await CommentApi.createComment(data)
    res.send(resultUtil.success())
  } catch (error) {
    throw error
  }
})

/* admin */
/* 获取文章列表 */
router.get('/list', async function(req, res, next) {
  try {
    const data = Object.assign({}, req.query)
    const page = parseInt(data.page) || 1 // 当前页数
    const pageSize = parseInt(data.pageSize) || 10 // 每页的文章数
    const state = data.state
    const commentList = await CommentApi.getCommentList({ page, pageSize,state })
    const total = await CommentApi.getCommentListCount({ state })
    // const commentTotal = await CommentApi.getCommentListCount()
    res.send(resultUtil.success({ list: commentList, page, pageSize, total }))
  } catch (error) {
    throw error
  }
})

/* 审核评论 */
router.post('/verify', async function(req, res, next) {
  try {
    const data = req.body
    await CommentApi.verifyComment(data.id, data.state)
    res.send(resultUtil.success())
  } catch (error) {
    throw error
  }
})

module.exports = router
