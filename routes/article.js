const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const resultUtil = require('../utils/result');

const ArticleModel = require('../models').Article;
const CommentModel = require('../models').Comment;

const ArticleService = require('../service/article');

/* 获取文章列表 */
router.get('/list', async function (req, res, next) {
  try {
    let data = req.query;
    let pageNum = parseInt(data.page) || 1; // 当前页数
    let limit = parseInt(data.limit) || 10; // 每页的文章数
    let result = await ArticleModel.find({})
      .skip(limit * (pageNum - 1))
      .limit(limit)
      .sort({
        'createTime': -1
      })
    resultUtil.data = result;
    res.send(resultUtil)
  } catch (error) {
    if (error) throw error;
  }
});

/* 发表文章 */
router.post('/publish', async function (req, res, next) {
  try {
    let data = req.body
    // 文章状态 0:草稿 1:发布 2:删除
    if (data.status === 'published') { data.state = 1
    } else {
      data.state = 0
    }
    let article = new ArticleModel(data)
    article.save()
    res.send(resultUtil)
  } catch (error) {
    if (error) throw error;
  }
})

/* 发表文章的评论 */
router.post('/comment', function (req, res, next) {
  try {
    let data = Object.assign({}, req.body)
    data.articleId = mongoose.Types.ObjectId(data.articleId)
    data.fromUId = mongoose.Types.ObjectId(data.fromUId)
    let comment = new CommentModel(data)
    comment.save()
    res.send(resultUtil)
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.get('/test', function (req, res, next) {
  ArticleService.getArticleList(10, 1)
})

module.exports = router