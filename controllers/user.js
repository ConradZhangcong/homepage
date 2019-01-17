/**
 * 用户控制器
 */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const resultUtil = require('../utils/result')
const timeUtil = require('../utils/time')
const md5 = require('md5-node')

const UserApi = require('../api/user')

/* 执行登录 */
router.post('/login', async function(req, res, next) {
  try {
    const data = req.body
    const userList = await UserApi.getUserByEmail(data.email)
    const userDetail = userList[0]
    if (userDetail.length === 0) {
      res.send(resultUtil.error('邮箱不存在'))
    }
    if (userDetail.password !== md5(data.password)) {
      res.send(resultUtil.error('密码错误'))
    } else {
      // 登陆成功 添加到session
      let sessionData = {
        _id: userDetail._id,
        email: userDetail.email,
        username: userDetail.username
      }
      console.log(req.session.user)
      req.session.user = sessionData
      console.log(req.session.user)
      req.app.locals.user = sessionData
      res.send(resultUtil.success())
      // 添加记录到日志文件 login.log
      let nowTime = timeUtil()
      let logInfo = 'user: ' + userDetail.username + ' logged in at ' + nowTime + '\n'
      fs.writeFile('./logs/login.log', logInfo, { flag: 'a' }, err => {
        if (err) throw err
        console.log(logInfo)
      })
    }
  } catch (error) {
    throw error
  }
})

/* 执行注册, 注册成功后自动登录 */
router.post('/register', async function(req, res, next) {
  try {
    const data = Object.assign({}, req.body) // 浅克隆前端传过来的数据进行操作
    data.password = md5(data.password) // 密码进行md5加密
    const userData = await UserApi.createUser(data)
    console.log(userData)
    let sessionData = {
      _id: userData._id,
      email: userData.email,
      username: userData.username
    }
    req.session.user = sessionData
    req.app.locals.user = sessionData
    res.send(resultUtil.success())
    // 添加记录到日志文件 register.log
    let logInfo = `user: ${userData.username} registered at ${userData.createTime}\n`
    fs.writeFile('./logs/register.log', logInfo, { flag: 'a' }, err => {
      if (err) throw err
      console.log(logInfo)
    })
  } catch (error) {
    throw error
  }
})

/* 判断是否注册 */
router.post('/isUser', async function(req, res, next) {
  try {
    const userInfo = await UserApi.getUserByEmail(req.body.email)
    if (userInfo.length === 0) {
      res.send(resultUtil.success())
    } else {
      res.send(resultUtil.error('邮箱已被注册'))
    }
  } catch (error) {
    throw error
  }
})

/* 退出登录 */
router.post('/logout', function(req, res, next) {
  req.session.user = undefined
  req.app.locals.user = undefined
  res.send(resultUtil.success())
})

module.exports = router
