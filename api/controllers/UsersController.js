const bcrypt = require('bcrypt-nodejs');
const { resError, resSuccess, getToken } = sails.config.custom

module.exports = {
    'listUsers': (req, res) => {
        Users.getDatastore().sendNativeQuery('CALL listusers_getAllData', [], (err, data) => {
            if (err) return resError(res, err)
            resSuccess(res, '', data.rows[0])
        });
    },
    'check': function (req, res) {
        return res.json(req.user);
    },
    'login': (req, res) => {
        let { username, password } = req.body
        Users.find({ username: username }).exec((err, data) => {
            if (err) return resError(res, err)
            if (data.length > 0) {
                let { id, password: password_db, status } = data[0]
                //To check a password
                bcrypt.compare(password, password_db, function (err, resPass) {
                    if (resPass) {
                        let obj = {
                            username: username,
                            user_id: id
                        }
                        getToken(obj)
                            .then(token => {
                                if (status == 'deactive') {
                                    resError(res, 'ERROR_USERNAME_DEACTIVE')
                                } else {
                                    resSuccess(res, 'LOGIN_SUCCESS', { token: token, userInfo: obj })
                                }
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

    },
    'addUsers': (req, res) => {
        Users.create(req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'updateUsers': (req, res) => {
        let data = req.body
        Users.find({ username: req.body.username }).exec((err, datauser) => {
            if (err) return resError(res, err)
            if (datauser.length > 0) {
                let user = datauser[0]
                if (user.password == req.body.password) {
                    Users.update({ id: data.id }, data).exec((err, result) => {
                        if (err) return resError(res, err)
                        resSuccess(res)
                    });
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(data.password, salt, null, function (err, hash) {
                            data.password = hash
                            Users.update({ id: data.id }, data).exec((err, result) => {
                                if (err) return resError(res, err)
                                resSuccess(res)
                            });
                        });
                    });
                }

            }

        })



    },
    'deleteUsers': (req, res) => {
        let { id } = req.query
        Users.destroy({
            id: { in: [id] }
        }).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },

};

