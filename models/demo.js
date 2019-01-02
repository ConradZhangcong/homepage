/**
 * model 测试数据库操作
 */
var Article = require("./article.js");

let content = "# blog ## 介绍 我的个人博客 分享我的学习过程,生活等";

// 插入
function insert() {
  var article = new Article({
    title: '2019',
    describe: '测试描述6',
    content: content,
    classify: '生活', // 分类
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