const {logErr} = require('./logErr')

const resError = (res, err) => {
    logErr('resError>>>>>', JSON.stringify(err))
    res.json({
        StatusCode: 1,
        Message: JSON.stringify(err),
        Data: []
    })
}
module.exports = {
    resError
}