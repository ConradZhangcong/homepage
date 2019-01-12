# blog

## 介绍

我的个人博客 分享我的学习过程,生活等

## 目录结构

```
├── bin                         启动文件
│   └── www
├── controllers                 控制器
├── logs
├── middlewares                 中间件
├── models                      连接数据库以及实体
│   ├── article.js                文章实体
│   ├── comment.js                评论实体
│   ├── mongoose.js               数据库连接
│   └── user.js                   用户实体
├── public                      静态资源
│   ├── css
│   ├── js
│   ├── font
│   └── img
├── utils                       工具类
│   ├── result.js                 返回结果对象
│   └── time.js                   moment.js二次封装
├── view                        视图
│   └── common                    公共视图
├── app.js
├── config.default.js           默认配置
├── LICENSE
├── package.json
└── README.md
```