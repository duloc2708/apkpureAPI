const bcrypt = require('bcrypt-nodejs');
const { resError, resSuccess, getToken } = sails.config.custom

module.exports = {
    'check': function (req, res) {
        return res.json(req.user);
    },
    'login': (req, res) => {
        let { username, password } = req.body
        Users.find({ username: username }).exec((err, data) => {
            if (err) return resError(res, err)
            if (data.length > 0) {
                let { id, password: password_db } = data[0]
                //To check a password
                bcrypt.compare(password, password_db, function (err, resPass) {
                    if (resPass) {
                        let obj = {
                            username: username,
                            user_id: id
                        }
                        getToken(obj)
                            .then(token => {
                                resSuccess(res, 'LOGIN_SUCCESS', token)
                            })
                            .catch(err => {
                                resError(res, 'ERROR_USERNAME_OR_PASSWORD')
                            });
                    } else {
                        resError(res, 'ERROR_USERNAME_OR_PASSWORD')
                    }
                })
            } else {
                resError(res, 'USERS_DO_NOT_EXSITS')
            }
        })
    },
    'register': (req, res) => {
        let { username, password } = req.body
        Users.find({ username: username }).exec((err, data) => {
            if (err) return resError(res, err)

            if (data.length > 0) {
                resSuccess(res, 'USER_EXISTS')
            } else {
                Users.create(req.body).exec(function (err, result) {
                    if (err) {
                        resError(res, err)
                    }
                    else {
                        resSuccess(res, 'INSERT_SUCCESS')
                    }
                });
            }

        })

    }
};

