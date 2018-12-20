const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('layout', {
    pagename: 'index',
    title: 'Conrad'
  });
});

router.get('/login', function (req, res, next) {
  res.render('layout', {
    pagename: 'login',
    title: '登录'
  });
});

router.post('/doLogin', function (req, res, next) {
  console.log(req.body)
  userModel.find({
    username: req.body.username
  }, (err, data) => {
    if (err) throw err
    if(data.length !== 0){ // 如果查询不到数据返回[]  判断数组为空
      console.log(data)
      res.send({
        isLogin: true
      })
    }else{
      console.log('错误')
    }
  })
})

module.exports = router;