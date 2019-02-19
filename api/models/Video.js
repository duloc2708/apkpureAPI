/**
 * Video.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: 'string',
    link: 'string',
    desciption: 'string',
    tags: 'string',
    thumbnail: 'string',
    levels: { type: 'string', columnType: 'int', defaultsTo: '0' },
    list_play: 'string'
  },
};

sails.config.models.migrate = 'safe';
