const resSuccess = (res, message = '', data = []) => {
    res.json({
        StatusCode: 0,
        Message: message,
        Data: data
    })
}
module.exports = {
    resSuccess
}