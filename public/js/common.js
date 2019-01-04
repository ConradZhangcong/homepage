$('#btn-logout').click(function () {
  console.log('退出登录')
  layer.open({
    type: 3
  });
  $.ajax({
    type: 'post',
    url: '/logout',
    success: function (res) {
      layer.closeAll('loading');
      if (res.code === 200) {
        layer.msg('成功退出登录!', {
          icon: 1,
          shade: 0.1,
          time: 1000
        });
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        layer.msg(res.msg, {
          icon: 2,
          time: 1000
        });
      }
    },
    error: function (error) {
      console.log(error);
      layer.closeAll('loading');
      layer.msg('服务器繁忙', {
        icon: 2
      });
      return false;
    }
  })
})