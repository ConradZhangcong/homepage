const express = require('express')
const router = express.Router()

// utils
const resultUtil = require('../utils/result');
const timeUtil = require('../utils/time')

// third party plugin
const md5 = require('md5-node')
const marked = require('marked')

// api
const ArticleApi = require('../api/article')
const UserApi = require('../api/user')




module.exports = router
