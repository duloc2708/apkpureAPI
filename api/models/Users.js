/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {
  attributes: {
    // createdAt: { type: 'string', columnType: 'datetime', autoCreatedAt: true, },
    // updatedAt: { type: 'string', columnType: 'datetime', autoUpdatedAt: true, },
    username: 'string',
    fullname: 'string',
    gender: 'string',
    address: 'string',
    password: 'string',
    email: 'string',
    status: 'string',
    score: 'string',
    scorelevel: 'string',
    avatar: 'string'
  },
  customToJSON: function () {
    return __dirname.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};
sails.config.models.migrate = 'safe';
