const { custom } = require('../../config/custom')
const { LIST_API_USER, getContextAPI } = custom
module.exports = getContextAPI(LIST_API_USER, 'UsersController')