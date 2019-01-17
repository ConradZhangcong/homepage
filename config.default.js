const config = {
  // 项目的基本配置
  hostname: '127.0.0.1',
  port: 8517,
  hotListNum: 7,
  /**
   * 数据库基本配置
   * 本地测试库 mongodb://127.0.0.1:27017/blog
   */
  dbHost: '127.0.0.1',
  dbPort: '27017',
  dbName: 'blog',
  /* 博客的基础配置 */
  title: 'Conrad的博客',
  user: undefined,
  /* session的配置 */
  sessionName: 'sessionId',
  sessionSecret: 'conrad', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  sessionMaxAge: 1000 * 60 * 60 * 6, // session过期时间
}

config.dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}` // 数据库地址拼接

module.exports = config;