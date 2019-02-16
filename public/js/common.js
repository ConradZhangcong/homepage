const oBackTop = document.querySelector('.back-top') // 返回顶部按钮
const oFooter = document.querySelector('.footer-container') // 底部

// 退出登录
$('#btn-logout').click(function() {
  new AjaxRequest({
    url: '/user/logout',
    callback: function(res) {
      layer.msg('成功退出登录!', {
        icon: 1,
        time: 1000,
        shade: 0.1
      })
      setTimeout(function() {
        window.location.reload()
      }, 1000)
    }
  })
})

// 返回顶部按钮点击
window.addEventListener('scroll', function() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
  oBackTop.style.display = currentScroll > 260 ? 'block' : 'none'
  let abs =
    Math.abs(document.body.clientHeight - document.documentElement.clientHeight) - currentScroll
  oBackTop.style.bottom = abs < oFooter.clientHeight + 10 ? 100 - abs + 'px' : '30px'
})

oBackTop.onclick = function smoothscroll() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
  if (currentScroll > 0) {
    requestAnimationFrame(smoothscroll)
    scrollTo(0, currentScroll - currentScroll / 5)
  }
}
