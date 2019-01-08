const express = require('express');
const router = express.Router();
const fs = require('fs');
const resultUtil = require('../utils/result');
const timeUtil = require('../utils/time');
const md5 = require('md5-node');
const marked = require('marked');

const userModel = require('../models/user');
const articleModel = require('../models/article');

router.get('/', function (req, res, next) {
  res.redirect('/blog');
})

router.get('/blog', async function (req, res, next) {
  let articleList = [],
    hotList = [],
    classList = [],
    tagList = [];
  const total = await articleModel.find({}).count(); // 文章总数
  const limit = 5; // 每页的文章数量
  const pages = Math.ceil(total / limit) // 文章总页数
  let pageNum = req.query.page; // 当前页数
  // if (pageNum > pages || parseInt(pageNum) <= 0) res.redirect('/blog');
  pageNum = parseInt(req.query.page) || 1;
  // 文章列表
  const getArticleList = new Promise((resolve, reject) => {
    if (pageNum) { // 其他页数传入id
      // 查找文章列表
      articleModel.find({})
        .skip(limit * (pageNum - 1))
        .limit(limit)
        .sort({
          '_id': -1
        })
        .exec(callback);
    } else { // 第一页
      articleModel.find({})
        .limit(limit)
        .sort({
          '_id': -1
        })
        .exec(callback);
    }

    function callback(err, data) {
      if (err) reject(err);
      articleList = data;
      resolve(data);
    }
  })
  // 热门文章列表
  const getHotList = new Promise((resolve, reject) => {
    articleModel.find({})
      .limit(7)
      .sort({
        'reading': -1
      })
      .exec((err, data) => {
        if (err) reject(err);
        hotList = data;
        resolve(data);
      })
  })
  Promise.all([getArticleList, getHotList])
    .then(result => {
      res.render('layout', {
        pagename: 'blog',
        username: req.session.username,
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
        },
      });
    })
    .catch(e => console.log(e))
});

router.get('/login', function (req, res, next) {
  if (req.session.username) { // 已经登录
    res.render('notify', {
      msg: '您已经登录'
    })
  } else { // 尚未登录
    res.render('layout', {
      pagename: 'login',
      title: '登录 - Conrad的博客'
    });
  }
});

router.get('/register', function (req, res, next) {
  if (req.session.username) { // 已经登录
    res.render('notify', {
      msg: '您已经登录,不需要注册'
    })
  } else { // 尚未登录
    res.render('layout', {
      pagename: 'register',
      title: '注册 - Conrad的博客'
    });
  }
});

router.get('/about', function (req, res, next) {
  res.render('layout', {
    pagename: 'about',
    title: '关于我 - Conrad的博客'
  });
});

router.get('/article', async function (req, res, next) {
  // 通过id查找文章
  let articleId = req.query.id;
  let readingNum;
  await articleModel.findById(articleId, function (err, data) {
    if (err) throw err;
    let content = marked(data.content);
    // 渲染文章
    readingNum = data.reading + 1;
    res.render('layout', {
      pagename: 'article',
      title: data.title,
      articleDetail: data,
      content: content
    });
  })
  // 增加阅读量
  await articleModel.updateOne({
    _id: articleId
  }, {
    reading: readingNum
  }, function (error) {
    if (error) throw error;
  })
});

/**
 * 执行登录
 */
router.post('/doLogin', function (req, res, next) {
  userModel.find({
    email: req.body.email
  }, (err, data) => {
    if (err) throw err;
    if (data.length !== 0) { // 查询数据库存在邮箱
      if (data.length > 1) { // 如果查询数据库结果有多个
        resultUtil.code = 0;
        resultUtil.msg = "账号异常,请联系管理员";
        res.send(resultUtil);
        return false;
      } else if (data[0].password !== md5(req.body.password)) { // 输入密码不正确
        resultUtil.code = 0;
        resultUtil.msg = "密码错误";
        res.send(resultUtil);
        return false;
      } else {
        let logInfo = '';
        let nowTime = timeUtil();
        // 登陆成功 添加到session
        req.session.username = data[0].username;
        req.app.locals.username = data[0].username;

        resultUtil.code = 200;
        resultUtil.msg = "登录成功";
        res.send(resultUtil);

        // 添加记录到日志文件 login.log
        logInfo = 'user: ' + data[0].username + ' logged in at ' + nowTime + '\n';
        fs.writeFile('./logs/login.log', logInfo, {
          flag: 'a'
        }, function (err) {
          if (err) throw err;
          console.log('user ' + data[0].username + ' logged in at ' + nowTime);
        });
      }
    } else { // 查询数据库未找到邮箱
      resultUtil.code = 0;
      resultUtil.msg = "邮箱不存在";
      res.send(resultUtil)
    }
  })
})

/**
 * 执行注册
 */
router.post('/doRegister', function (req, res, next) {
  let userData = Object.assign({}, req.body); // 浅克隆前端传过来的数据进行操作
  let logInfo = '';
  userData.createTime = timeUtil(); // 创建时间-当前的时间
  userData.password = md5(userData.password); // 密码进行md5加密
  userModel.create(userData, (err, data) => {
    if (err) throw err;
    // 注册成功 自动登录
    req.session.username = userData.username;
    req.app.locals.username = userData.username;

    resultUtil.msg = "注册成功";
    res.send(resultUtil);
    // 添加记录到日志文件 register.log
    logInfo = 'user: ' + userData.username + ' registered at ' + userData.createTime + '\n';
    fs.writeFile('./logs/register.log', logInfo, {
      flag: 'a'
    }, function (err) {
      if (err) throw err;
      console.log('user ' + userData.username + ' registered at ' + userData.createTime);
    });
  })
})

/**
 * 判断是否注册
 */
router.post('/isUser', function (req, res, next) {
  userModel.find({
    email: req.body.email
  }, (err, data) => {
    if (err) throw err;
    if (data.length === 0) { // 邮箱未注册
      res.send(resultUtil)
    } else { // 邮箱已被注册
      resultUtil.code = 0;
      resultUtil.msg = "邮箱已被注册";
      res.send(resultUtil);
    }
  })
})

/**
 * 退出登录
 */
router.post('/logout', function (req, res, next) {
  req.session.username = '';
  req.app.locals.username = '';
  resultUtil.msg = "成功退出登录";
  res.send(resultUtil);
})

module.exports = router;