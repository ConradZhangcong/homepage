const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const resultUtil = require('../utils/result')

const ArticleApi = require('../api/article')

/* admin */
/* 获取文章列表 */
router.get('/list', async function(req, res, next) {
  try {
    const data = Object.assign({}, req.query)
    const page = parseInt(data.page) || 1 // 当前页数
    const pageSize = parseInt(data.pageSize) || 10 // 每页的文章数
    const articleList = await ArticleApi.getArticleList({ page, pageSize })
    const articleTotal = await ArticleApi.getArticleListCount()
    res.send(resultUtil.success({ list: articleList, total: articleTotal, page, pageSize }))
  } catch (error) {
    if (error) throw error
  }
})

/* 发表文章 */
router.post('/publish', async function(req, res, next) {
  try {
    let data = req.body
    // 文章状态 0:草稿 1:发布 2:删除
    // TODO: 前后端status传参调整
    if (data.status === 'published') {
      data.state = 1
    } else {
      data.state = 0
    }
    await ArticleApi.publishArticle(data)
    res.send(resultUtil.success())
  } catch (error) {
    if (error) throw error
  }
})

module.exports = router
