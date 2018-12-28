/**
 * model 测试数据库操作
 */
var Article = require("./article.js");
// 插入
function insert() {
  var article = new Article({
    title: '测试标题1',
    describe: '测试描述1',
    content: '222',
    classify: 'test', // 分类
    tags: ['test', 'javascript'] // 标签
  });
  article.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
  });
}
insert();