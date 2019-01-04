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

var app = express();

app.locals.title = config.title; // 默认的title
app.locals.username = config.username; // 配置username 配合session判断是否登录
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
  secret: 'secret', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name: 'sessionId',
  /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,
  /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true, //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
    maxAge: 1000 * 30 * 60 /*过期时间*/
  },
  /* secure:true  https这样的情况才可以访问cookie */
  rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  store: new mongoStore({
    url: config.dbUrl, //数据库的地址  shop是数据库名
    touchAfter: 24 * 3600 // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
  })
}));

// favicon 标签的图标
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))
// routes
app.use('/', indexRouter);

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