/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
var time = require('../utils/time');

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return time();
  };

  schema.methods.update_at_ago = function () {
    return time();
  };
};