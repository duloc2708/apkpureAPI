/**
 * PageService.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    routes: 'string',
    title: 'string',
    content: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    }
  }
};
sails.config.models.migrate = 'safe';
