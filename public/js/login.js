$('.login-button').click(function () {
  let data = {
    username: $('#login-email').val(),
    password: $('#login-password').val()
  }
  $.ajax({
    type: 'post',
    url: '/doLogin',
    data: data,
    success: function (data) {
      console.log(data)
      if (data.isLogin) {
        console.log('登录成功')
      }
    },
    error: function (error) {
      console.log(error)
    }
  })
})