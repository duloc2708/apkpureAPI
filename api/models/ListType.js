/**
 * ListType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    numOrder: 'number',
    code: 'string',
    name: 'string',
    slug: 'string',
    remark: 'string',
    // emailAddress: { type: 'string', required: true, },
    // karma: { type: 'number', },
    // isSubscribedToNewsletter: { type: 'boolean', defaultsTo: true, },
  },
};
sails.config.models.migrate = 'safe';

