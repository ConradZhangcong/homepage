const config = require('../config.default')
const ArticleModel = require('../models').Article

/**
 * get article list with pagnation
 * @param {Object} params params list
 * - pageSize amount of article every page
 * - page current page
 */
exports.getArticleList = params => {
  let { pageSize, page } = params
  return ArticleModel.find({})
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createTime: -1 })
}

/**
 * get hot article list
 * @param {Number} limit the amount of hot article  default=7
 */
exports.getHotArticleList = limit => {
  limit = limit || config.hotListNum
  return ArticleModel.find({})
    .limit(limit)
    .sort({ reading: -1 })
}

/**
 * get all amount of all articles
 */
exports.getArticleListCount = () => {
  return ArticleModel.estimatedDocumentCount()
}

/**
 * find article by id
 * @param {Object} id articleId
 */
exports.getArticleDetailById = id => {
  return ArticleModel.findById(id)
}

/**
 * add article's amount of reading when visited
 * @param {Object} id articleId
 */
exports.addArticleReadingById = id => {
  return ArticleModel.where({ _id: id }).updateOne({ $inc: { reading: 1 } })
}

/**
 * publish article
 * @param {Object} params same as ArticleModels
 * - title 文章标题
 * - describe 文章描述
 */
exports.publishArticle = params => {
  ArticleModel.create(params)
}
