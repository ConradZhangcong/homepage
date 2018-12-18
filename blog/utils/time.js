const monent = require('moment');

moment.local('zh-cn')

module.exports = function (date) {
  date = monent(date);
  return date
}