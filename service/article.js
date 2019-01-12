const ArticleModel = require('../models').Article
const CommentModel = require('../models').Comment

/**
 * get article list with pagnation
 * @param {Object} params params list
 * - limit 每页的文章数量
 * - page 当前的页数
 */
exports.getArticleList = params => {
  let { limit, page } = params
  return ArticleModel.find({})
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createTime: -1 })
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
  ArticleModel.where({ _id: id }).update({ $inc: { reading: 1 } })
}

/**
 * get comments by article id
 * @param {Object} id articleId
 */
exports.getCommentsByArticleId = id => {
  return CommentModel.find({ articleId: id })
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
