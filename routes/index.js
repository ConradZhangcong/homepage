const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
const resultUtil = require('../utils/result')
const timeUtil = require('../utils/time')
const md5 = require('md5-node')
const marked = require('marked')

const UserModel = require('../models').User
const ArticleModel = require('../models').Article
const commentModel = require('../models').Comment

const ArticleService = require('../service/article')

router.get('/', function(req, res, next) {
  res.redirect('/blog')
})

router.get('/blog', async function(req, res, next) {
  console.log(req.session)
  let articleList = [],
    hotList = [],
    classList = [],
    tagList = []
  const total = await ArticleModel.estimatedDocumentCount() // 文章总数
  const limit = 5 // 每页的文章数量
  const pages = Math.ceil(total / limit) // 文章总页数
  let pageNum = req.query.page // 当前页数
  // if (pageNum > pages || parseInt(pageNum) <= 0) res.redirect('/blog');
  pageNum = parseInt(req.query.page) || 1
  // 文章列表
  const getArticleList = new Promise((resolve, reject) => {
    if (pageNum) {
      // 其他页数传入id
      // 查找文章列表
      ArticleModel.find({})
        .skip(limit * (pageNum - 1))
        .limit(limit)
        .sort({
          _id: -1
        })
        .exec(callback)
    } else {
      // 第一页
      ArticleModel.find({})
        .limit(limit)
        .sort({
          _id: -1
        })
        .exec(callback)
    }

    function callback(err, data) {
      if (err) reject(err)
      articleList = data
      resolve(data)
    }
  })
  // 热门文章列表
  const getHotList = new Promise((resolve, reject) => {
    ArticleModel.find({})
      .limit(7)
      .sort({
        reading: -1
      })
      .exec((err, data) => {
        if (err) reject(err)
        hotList = data
        resolve(data)
      })
  })
  Promise.all([getArticleList, getHotList])
    .then(result => {
      console.log(req.app.locals)
      res.render('layout', {
        pagename: 'blog',
        user: req.session.user,
        articleList,
        hotList,
        classList,
        tagList,
        total,
        pageNum,
        pages,
        limit,
        jsData: {
          pages,
          pageNum
        }
      })
    })
    .catch(e => console.log(e))
})

router.get('/login', function(req, res, next) {
  if (JSON.stringify(req.session.user) === '{}') {
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
  if (JSON.stringify(req.session.user) === '{}') {
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
    const articleId = req.query.id // type: String
    const articleDetail = await ArticleService.getArticleDetailById(articleId)
    const articleContent = marked(articleDetail.content) // article content convert to markdown
    const commentList = await ArticleService.getCommentsByArticleId(articleId)
    console.log(commentList)
    // TODO: 增加阅读量
    // await ArticleService.addArticleReadingById()
    // 渲染文章
    res.render('layout', {
      pagename: 'article',
      title: articleDetail.title + ' - Conrad的博客',
      user: req.session.user,
      articleDetail,
      articleContent,
      jsData: {
        articleId: articleDetail._id,
        fromUId: req.session.user._id
      }
    })
  } catch (error) {
    throw error
  }
})

/* 执行登录 */
router.post('/doLogin', function(req, res, next) {
  UserModel.find({ email: req.body.email }, (err, data) => {
    if (err) throw err
    if (data.length === 0) {
      // 查询数据库未找到邮箱
      resultUtil.code = 0
      resultUtil.msg = '邮箱不存在'
      res.send(resultUtil)
    }
    if (data.length > 1) {
      // 如果查询数据库结果有多个
      resultUtil.code = 0
      resultUtil.msg = '账号异常,请联系管理员'
      res.send(resultUtil)
    }
    if (data[0].password !== md5(req.body.password)) {
      // 输入密码不正确
      resultUtil.code = 0
      resultUtil.msg = '密码错误'
      res.send(resultUtil)
    } else {
      // 登陆成功 添加到session
      let sessionData = {
        _id: data[0]._id,
        email: data[0].email,
        username: data[0].username
      }
      req.session.user = sessionData
      req.app.locals.user = sessionData
      res.send(resultUtil)
      // 添加记录到日志文件 login.log
      let nowTime = timeUtil()
      let logInfo =
        'user: ' + data[0].username + ' logged in at ' + nowTime + '\n'
      fs.writeFile(
        './logs/login.log',
        logInfo,
        {
          flag: 'a'
        },
        function(err) {
          if (err) throw err
          console.log(logInfo)
        }
      )
    }
  })
})

/* 执行注册, 注册成功后自动登录 */
router.post('/doRegister', function(req, res, next) {
  let userData = Object.assign({}, req.body) // 浅克隆前端传过来的数据进行操作
  userData.createTime = timeUtil() // 创建时间-当前的时间
  userData.password = md5(userData.password) // 密码进行md5加密
  UserModel.create(userData, (err, data) => {
    if (err) throw err
    // 注册成功 自动登录
    let sessionData = {
      _id: data._id,
      email: data.email,
      username: data.username
    }
    req.session.user = sessionData
    req.app.locals.user = sessionData
    res.send(resultUtil)
    // 添加记录到日志文件 register.log
    let logInfo =
      'user: ' +
      userData.username +
      ' registered at ' +
      userData.createTime +
      '\n'
    fs.writeFile(
      './logs/register.log',
      logInfo,
      {
        flag: 'a'
      },
      function(err) {
        if (err) throw err
        console.log(logInfo)
      }
    )
  })
})

/* 判断是否注册 */
router.post('/isUser', function(req, res, next) {
  UserModel.find(
    {
      email: req.body.email
    },
    (err, data) => {
      if (err) throw err
      if (data.length === 0) {
        // 邮箱未注册
        res.send(resultUtil)
      } else {
        // 邮箱已被注册
        resultUtil.code = 0
        resultUtil.msg = '邮箱已被注册'
        res.send(resultUtil)
      }
    }
  )
})

/* 退出登录 */
router.post('/logout', function(req, res, next) {
  req.session.user = {}
  req.app.locals.user = {}
  res.send(resultUtil)
})

module.exports = router
