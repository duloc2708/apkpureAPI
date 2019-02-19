/**
 * Tags.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    createdAt: { type: 'string', columnType: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'string', columnType: 'datetime', autoUpdatedAt: true, },
    name: 'string'
  },
};

sails.config.models.migrate = 'safe';
