/**
 * 页面控制器
 */
const express = require('express')
const router = express.Router()
const marked = require('marked')
const mongoose = require('mongoose')

const ArticleApi = require('../api/article')
const CommentApi = require('../api/comment')

router.get('/', function(req, res, next) {
  res.redirect('/blog')
})

router.get('/blog', async function(req, res, next) {
  try {
    let classList = [],
      tagList = []
    const total = await ArticleApi.getArticleListCount() // 文章总数
    const pageSize = 5 // 每页的文章数量
    const pages = Math.ceil(total / pageSize) // 文章总页数
    const page = req.query.page // 当前页数
    let queryList = { pageSize, page, total }
    queryList.page = page ? page : 1
    let [articleList, hotList] = await Promise.all([
      ArticleApi.getArticleList(queryList),
      ArticleApi.getHotArticleList()
    ])
    console.log(req.session.user)
    res.render('layout', {
      pagename: 'blog',
      user: req.session.user,
      articleList,
      hotList,
      classList,
      tagList,
      queryList,
      pageSize,
      jsData: {
        pages,
        page
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.get('/login', function(req, res, next) {
  let user = req.session.user
  console.log(user)
  console.log(!user)
  if (!user) {
    // 尚未登录
    res.render('layout', {
      pagename: 'login',
      title: '登录 - Conrad的博客'
    })
  } else {
    // 已经登录
    res.render('notify', {
      msg: '您已经登录'
    })
  }
})

router.get('/register', function(req, res, next) {
  let user = req.session.user
  if (!user) {
    // 尚未登录
    res.render('layout', {
      pagename: 'register',
      title: '注册 - Conrad的博客'
    })
  } else {
    // 已经登录
    res.render('notify', {
      msg: '您已经登录,不需要注册'
    })
  }
})

router.get('/about', function(req, res, next) {
  res.render('layout', {
    pagename: 'about',
    title: '关于我 - Conrad的博客'
  })
})

router.get('/article', async function(req, res, next) {
  try {
    // const articleId = req.query.id // type: String
    const articleId = mongoose.Types.ObjectId(req.query.id) // type: String
    const articleDetail = await ArticleApi.getArticleDetailById(articleId)
    const articleContent = marked(articleDetail.content) // article content convert to markdown
    const commentList = await CommentApi.getCommentsByArticleId(articleId)
    console.log(commentList)
    await ArticleApi.addArticleReadingById(articleId)
    // 渲染文章
    res.render('layout', {
      pagename: 'article',
      title: articleDetail.title + ' - Conrad的博客',
      user: req.session.user,
      articleDetail,
      articleContent,
      commentList,
      jsData: {
        articleId: articleDetail._id,
        user: req.session.user
      }
    })
  } catch (error) {
    throw error
  }
})

module.exports = router
