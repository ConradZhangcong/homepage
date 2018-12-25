class Result {
  constructor(code, data, msg) {
    this.code = 200;
    this.data = null;
    this.msg = '成功';
  }
}

module.exports = new Result();