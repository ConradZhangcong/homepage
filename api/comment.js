const CommentModel = require('../models').Comment

/**
 * get comment list with pagnation
 * @param {Object} params params list
 * - pageSize amount of article every page
 * - page current page
 */
exports.getCommentList = params => {
  let { pageSize, page, state } = params
  const query = {}
  if (state) {
    query.state = state
  }
  return CommentModel.find(query)
    .populate('fromUId')
    .populate('articleId')
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createTime: -1 })
}

/**
 * get comments by article id
 * populate with user's name and email
 * @param {Object} id articleId
 */
exports.getCommentsByArticleId = id => {
  return CommentModel.find({ articleId: id, state: 1 }).populate({
    path: 'fromUId',
    select: 'username avator'
  })
}

/**
 * get comment count with options
 * @param {Object} params params
 * - state:if the comment is verified
 */
exports.getCommentListCount = params => {
  let { state } = params
  return CommentModel.estimatedDocumentCount({ state })
}

/**
 * publish comment to some article
 * @param {Object} params same as commentModel
 * - articleId:the article's id which is commented
 * - fromUId:user's id who create the comment
 * - toUId:user's id who is applied
 * - content:the content of comment
 * - state:0-failed 1-pass 2-default
 */
exports.createComment = params => {
  CommentModel.create(params)
}

/**
 * verify comment
 * @param {Object} _id commentId
 * @param {Number} state 0:failed 1:pass 2:default
 */
exports.verifyComment = (_id, state) => {
  return CommentModel.findByIdAndUpdate({ _id }, { state })
}
