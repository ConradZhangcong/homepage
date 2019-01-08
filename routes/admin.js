const express = require('express');
const router = express.Router();
const resultUtil = require('../utils/result');

const articleModel = require('../models/article');

/* GET users listing. */
router.get('/article/list', function (req, res, next) {
  articleModel.find({}, (err, data) => {
    if (err) throw err;
    resultUtil.data = data;
    res.send(resultUtil)
  })
});

module.exports = router;