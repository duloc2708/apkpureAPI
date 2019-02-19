const { custom } = require('../../config/custom')
const { LIST_API_ARTICLES, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_ARTICLES, 'ArticlesController')