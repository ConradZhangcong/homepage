const express = require('express');
const router = express.Router();
const resultUtil = require('../utils/result');

const articleModel = require('../models/article');

/* GET users listing. */
router.get('/article/list', async function (req, res, next) {
  try {
    let data = req.query;
    let pageNum = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 10;
    let result = await articleModel.find({})
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

router.post('/article/publish', async function (req, res, next) {
  try {
    let data = req.body
    if (data.status === 'published') {
      data.state = 0
    } else {
      data.state = 1
    }
    let article = new articleModel(data)
    let result = article.save()
    res.send(resultUtil)
  } catch (error) {
    if (error) throw error;
  }
})

module.exports = router;