let articleData = JSON.parse(jsData)
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
    url: '/article/comment',
    params: {
      content,
      articleId: articleData.articleId,
      fromUId: articleData.fromUId
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