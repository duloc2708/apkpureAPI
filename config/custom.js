/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */
const listFunc = require('../api/common/func')
const listconstGlobal = require('../api/common/constGlobal')
let listConfig = {}

Object.keys(listFunc).forEach(key => {
  let objNew = {}
  objNew[key] = listFunc[key]
  Object.assign(listConfig, objNew);
});
Object.keys(listconstGlobal).forEach(key => {
  let objNew = {}
  objNew[key] = listconstGlobal[key]
  Object.assign(listConfig, objNew);
})
module.exports.custom = listConfig
