$('#btn-login').click(function () {
  let data = {
    email: $('#login-email').val(),
    password: $('#login-password').val()
  }
  // 验证邮箱格式
  let regEmail = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  if (!regEmail.test(data.email)) {
    layer.msg('邮箱格式不正确', {
      icon: 0
    });
    return false;
  }
  if (data.email === '') {
    layer.msg('请输入邮箱!', {
      icon: 0
    });
    return false;
  } else if (data.password === '') {
    layer.msg('请输入密码!', {
      icon: 0
    });
    return false;
  }
  // 发送登录ajax
  new AjaxRequest({
    url: '/doLogin',
    params: data,
    callback: function (res) {
      layer.msg('登录成功', {
        icon: 1,
        time: 1000,
        shade: 0.1
      });
      setTimeout(function () {
        window.location.href = '/'
      }, 1000);
    }
  })
})