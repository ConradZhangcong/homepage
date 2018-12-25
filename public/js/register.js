$('#register-button').click(function () {
  let data = {
    email: $('#register-email').val(),
    username: $('#register-username').val(),
    password: $('#register-password').val()
  }
  // 验证邮箱格式
  let regEmail = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  if (!regEmail.test(data.email)) {
    console.log('邮箱格式不正确');
    return false;
  }
  if (data.email === '') {
    console.log('请输入邮箱')
    return false;
  } else if (data.username === '') {
    console.log('请输入用户名')
    return false;
  } else if (data.username === '') {
    console.log('请输入密码')
    return false;
  } else if ($('#register-repassword').val() === '') {
    console.log('请输入再次输入密码')
    return false;
  }
  if (data.password !== $('#register-password').val()) {
    console.log('两次输入的密码不一致')
    return false;
  }
  $.ajax({
    type: 'post',
    url: '/isUser',
    data: {
      email: data.email
    },
    success: function (res) {
      if (res.code === 200) { // 邮箱未注册,添加数据
        $.ajax({
          type: 'post',
          url: '/doRegister',
          data: data,
          success: function (res) {
            if (res.code === 200) {
              console.log('注册成功');
              return false;
            } else {
              console.log('注册失败');
              return false;
            }
          },
          error: function (error) {
            console.log(error);
            return false;
          }
        })
      } else {
        console.log(res.msg)
        return false;
      }
    },
    error: function (error) {
      console.log(error);
      return false;
    }
  })
})