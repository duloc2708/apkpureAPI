
const { getObject } = sails.config.custom

module.exports = function (req, res, next) {
  var token;
  //Check if authorization header is present
  if (req.headers && req.headers.authorization) {
    //authorization header is present
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
    }
  } else {
    //authorization header is not present
    return res.json({
      StatusCode: 3,
      Message: 'No Authorization header was found',
      Data: []
    })
  }
  getObject(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      return res.json({
        StatusCode: 2,
        Message: 'Invalid token',
        Data: []
      })
    })
};