// 退出登录
$('#btn-logout').click(function () {
  new AjaxRequest({
    url: '/user/logout',
    callback: function (res) {
      layer.msg('成功退出登录!', {
        icon: 1,
        time: 1000,
        shade: 0.1
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  })
})