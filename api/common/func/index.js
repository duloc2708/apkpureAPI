const { getContextAPI } = require('./getContextAPI')
const { logErr } = require('./logErr')
const { resError } = require('./resError')
const { resSuccess } = require('./resSuccess')
const { saveFileImage } = require('./saveFileImage')
const { getObject, getToken } = require('./jwt')
const { saveFileBase64 } = require('./saveFileBase64')
const { convertSlug } = require('./convertSlug')
const { resize } = require('./resize')

module.exports = {
    resize,
    convertSlug,
    getContextAPI,
    logErr,
    resSuccess,
    resError,
    getObject,
    getToken,
    saveFileImage,
    saveFileBase64
}