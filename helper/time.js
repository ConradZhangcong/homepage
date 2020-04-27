const moment = require('moment')

moment.locale('zh-cn')

module.exports = (date = new Date(), format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}
