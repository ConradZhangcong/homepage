$('#btn-register').click(function () {
  let data = {
    email: $('#register-email').val(),
    username: $('#register-username').val(),
    password: $('#register-password').val()
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
    layer.msg('请输入邮箱', {
      icon: 0
    });
    return false;
  } else if (data.username === '') {
    layer.msg('请输入用户名', {
      icon: 0
    });
    return false;
  } else if (data.username === '') {
    layer.msg('请输入密码', {
      icon: 0
    });
    return false;
  } else if ($('#register-repassword').val() === '') {
    layer.msg('请输入再次输入密码', {
      icon: 0
    });
    return false;
  }
  if (data.password !== $('#register-repassword').val()) {
    layer.msg('两次输入的密码不一致', {
      icon: 0
    });
    return false;
  }
  new AjaxRequest({
    url: '/isUser',
    params: {
      email: data.email
    },
    callback: function (res) {
      new AjaxRequest({
        url: '/doRegister',
        params: data,
        callback: function (res) {
          layer.msg('注册成功', {
            icon: 1,
            time: 1000,
            shade: 0.1
          });
          setTimeout(function () {
            window.location.href = '/';
          }, 1000);
        }
      })
    }
  })
})

function doRegister(data) {
  new AjaxRequest({
    url: '/doRegister',
    params: data,
    callback: function (res) {
      layer.msg('注册成功', {
        icon: 1,
        time: 1000,
        shade: 0.1
      });
      setTimeout(function () {
        window.location.href = '/';
      }, 1000);
    }
  })
}