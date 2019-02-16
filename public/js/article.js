const articleData = JSON.parse(jsData) // 文章数据详情
const oMeunContainer = document.querySelector('.menu-container') // 目录容器
const oMenu = document.querySelector('.menu-list') // 目录列表ul
const menuList = $('.article-container>h1') // 文章标题列表

// 动态渲染目录
if (menuList.length === 0) {
  const oMain = document.querySelector('.main-container')
  const oContainer = document.querySelector('.menu-container')
  oMain.removeChild(oContainer)
} else {
  for (let i = 0; i < menuList.length; i++) {
    let oLi = document.createElement('li')
    oLi.innerHTML = menuList[i].innerText
    oMenu.appendChild(oLi)
  }
}

// 点击目录跳转
for (let i = 0; i < oMenu.childNodes.length; i++) {
  oMenu.childNodes[i].onclick = function moveto() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
    let speed = Math.floor((menuList[i].offsetTop - currentScroll) / 3)
    if (speed !== 0) {
      requestAnimationFrame(moveto)
      scrollTo(0, currentScroll + speed)
    } else {
      scrollTo(0, menuList[i].offsetTop)
    }
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

window.addEventListener('scroll', function() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
  oMeunContainer.style.top = currentScroll > 260 ? '40px' : 300 - currentScroll + 'px'
  oBackTop.style.display = currentScroll > 260 ? 'block' : 'none'
})
