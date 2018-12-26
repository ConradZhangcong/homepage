$('.login-button').click(function () {
  let data = {
    email: $('#login-email').val(),
    password: $('#login-password').val()
  }
  // 验证邮箱格式
  let regEmail = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  if (!regEmail.test(data.email)) {
    console.log('邮箱格式不正确');
    return false;
  }
  if (data.email === '') {
    console.log('请输入邮箱!');
    return false;
  } else if (data.password === '') {
    console.log('请输入密码!');
    return false;
  }
  $.ajax({
    type: 'post',
    url: '/doLogin',
    data: data,
    success: function (data) {
      console.log(data);
      if (data.code === 200) {
        console.log('登录成功');
        // self.location = document.referrer; // 返回上一个页面
        // console.log(document.referrer)
        window.location.href = '/'
        return false;
      } else {
        console.log(data.msg);
        return false;
      }
    },
    error: function (error) {
      console.log(error);
      return false;
    }
  })
})