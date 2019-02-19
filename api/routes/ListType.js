const { custom } = require('../../config/custom')
const { LIST_API_LISTTYPE, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_LISTTYPE, 'ListTypeController')