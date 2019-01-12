const mongoose = require('mongoose');
const config = require('../config.default.js');
const dbUrl = config.dbUrl;

// models
require('./article');
require('./comment');
require('./user');

// connect options
// https://mongoosejs.com/docs/connections.html
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
}

mongoose.connect(dbUrl, options, function (err, data) {
  if (err) {
    console.log('fail to connect to database  ' + dbUrl);
    console.log('error message: ' + err.msg)
  } else {
    console.log('connect to databse ' + dbUrl);
  }
})

exports.Article = mongoose.model('Article');
exports.User = mongoose.model('User');
exports.Comment = mongoose.model('Comment');