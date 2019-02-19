const { custom } = require('../../config/custom')
const { LIST_API_VIDEO, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_VIDEO, 'VideoController')