/**
 * @param code
 * @param data
 * @param msg
 */
const result = {
  code: 200,
  data: null,
  msg: ''
}

/**
 * the request is success
 * @param {Object} data
 */
exports.success = data => {
  let res = Object.assign({}, result)
  res.data = data || null
  return res
}

/**
 *
 * @param {Number} code
 * @param {String} msg
 */
exports.error = (msg, code) => {
  let res = Object.assign({}, result)
  res.msg = msg || '内部错误'
  res.code = code || 0
  return res
}
