const { custom } = require('../../config/custom')
const { LIST_API_BLOGS, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_BLOGS, 'BlogsController')