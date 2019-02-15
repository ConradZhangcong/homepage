// 文章数据详情
const articleData = JSON.parse(jsData)

// 动态渲染目录
let menuList = $('.article-container>h1')
if (menuList.length === 0) {
  const oMain = document.querySelector('.main-container')
  const oContainer = document.querySelector('.menu-container')
  oMain.removeChild(oContainer)
} else {
  let oMenu = document.querySelector('.menu-list')
  for (let i = 0; i < menuList.length; i++) {
    let oLi = document.createElement('li')
    let oA = document.createElement('a')
    oA.href = '#' + menuList[i].id
    oA.innerHTML = menuList[i].innerText
    oLi.appendChild(oA)
    oMenu.appendChild(oLi)
  }
}

// 评论按钮
$('#btn-comment').click(function() {
  var content = $('#comment-content').val()
  if (!content) {
    layer.msg('评论不能为空', {
      icon: 2,
      time: 1000
    })
    return false
  }
  new AjaxRequest({
    url: '/comment/publish',
    params: {
      content,
      articleId: articleData.articleId,
      fromUId: articleData.user._id
    },
    callback: function(res) {
      $('#comment-content').val('')
      layer.msg('评论成功!', {
        icon: 1,
        time: 1000
      })
    }
  })
})
