const { custom } = require('../../config/custom')
const { LIST_API_PAGE_SERVICE, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_PAGE_SERVICE, 'PageServiceController')