var createError = require('http-errors');
var express = require('express');
var path = require('path');
// const cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const chalk = require('chalk');
const config = require('./config.default.js');

// routes
var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');
var userRouter = require('./routes/user');

var app = express();

// 模板传值对象
app.locals.title = config.title; // 默认的title
app.locals.user = config.user; // 配置username 配合session判断是否登录
app.locals.jsData = {}; // 传递给外部js的数据

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

// 使用session中间件 session必须写在路由的上方
app.use(session({
  secret: config.sessionSecret,
  name: config.sessionName,
  resave: false,
  /* 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true, //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
    maxAge: config.sessionMaxAge
  },
  /* secure:true  https这样的情况才可以访问cookie */
  rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  store: new mongoStore({
    url: config.dbUrl,
    touchAfter: 24 * 3600 // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
  })
}));

// CORS跨域
app.use('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  // res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  if (req.method == 'OPTIONS') {
    res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});

// favicon 标签的图标
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))
// routes
app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 增加端口监听,并且在启动后提示
app.listen(config.port, config.hostname, function () {
  const addr = `http://${config.hostname}:${config.port}`;
  console.log(`Service Start at ${chalk.green(addr)}`);
})

module.exports = app;