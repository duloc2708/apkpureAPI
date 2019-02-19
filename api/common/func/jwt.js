const jwt = require('jsonwebtoken');

const SECRET_KEY = `?s__puug3gwMUSkzkfgn3M6EY7a=L8$!`;

function getObject(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, obj) => {
            if (err) return reject(err);
            resolve(obj);
        });
    });
}

function getToken(obj){
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECRET_KEY, {expiresIn: '10h'}, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

// getObject(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Iiwibmlja25hbWUiOiJhYmMiLCJUSyI6Ijc1MjE0NiIsIldhbGxldCI6IjJmNnM1ZjE2NXNmNDE2NXNmMTY1YXNmIiwiUHJlc2VudGVyIjoiQlRUIiwiaWF0IjoxNDk5MDIwNTA5LCJleHAiOjE0OTkwNDIxMDl9.F4_qPZfVhoT9PQTYpuvjaIHr8sDxheFDNKuU_bTf0TQ`)
// .then((obj) => console.log(obj))
// .catch((err) => console.log(err.toString()));

module.exports = { getObject, getToken };
