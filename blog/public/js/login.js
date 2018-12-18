let username = document.getElementById('username');
let password = document.getElementById('password');
let loginBtn = document.getElementById('btn-login');

loginBtn.onclick = function () {
  let data = {
    username: username.value,
    password: password.value
  }
  $.ajax({
    type: 'post',
    url: '/doLogin',
    data: data,
    success: function (data) {
      console.log(data)
      if(data.isLogin){
        console.log('登录成功')
      }
    },
    error: function (error) {
      console.log(error)
    }
  })
}