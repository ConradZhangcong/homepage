const UserModel = require('../models').User

/**
 * get user by email
 * @param {String} email user email must be unique
 */
exports.getUserByEmail = email =>{
  return UserModel.find({email})
}

/**
 * create user
 * @param {Object} params 
 */
exports.createUser = params=>{
  return UserModel.create(params)
}