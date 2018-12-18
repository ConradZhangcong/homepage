/**
 * model 测试数据库操作
 */
var User = require("./user.js");
// 插入
function insert() {
  var user = new User({
    username: 'zmt',
    pwd: '123',
    phone: '13773040464',
    createTime: new Date()
  });
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
  });
}
insert();