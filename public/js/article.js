let articleData = JSON.parse(jsData)
console.log(articleData)
$("#btn-comment").click(function () {
  var content = $('#comment-content').val()
  if (!content) {
    layer.msg('评论不能为空', {
      icon: 2,
      time: 1000
    })
    return false;
  }
  new AjaxRequest({
    url: '/comment/publish',
    params: {
      content,
      articleId: articleData.articleId,
      fromUId: articleData.user._id
    },
    callback: function (res) {
      $('#comment-content').val('');
      layer.msg('评论成功!', {
        icon: 1,
        time: 1000
      });
    }
  })
})