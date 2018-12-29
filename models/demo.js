/**
 * model 测试数据库操作
 */
var Article = require("./article.js");
// 插入
function insert() {
  var article = new Article({
    title: '测试标题6',
    describe: '测试描述6',
    content: '666',
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