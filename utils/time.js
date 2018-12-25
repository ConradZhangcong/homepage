const moment = require('moment');

moment.locale('zh-cn')

module.exports = function (date, format) {
  let formatDate = date ? date : new Date();
  let formatStr = format ? format : 'YYYY-MM-DD HH:mm:ss';
  let result = moment(formatDate).format(formatStr);
  return result;
}