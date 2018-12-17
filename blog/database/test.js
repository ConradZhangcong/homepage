var User = require("./user.js");

// 插入
function insert() {

  var user = new User({
    username: 'Conrad', //用户账号
    pwd: 'abcd', //密码
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