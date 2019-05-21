/**
 * Articles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: 'string',
    title_slug: 'string',
    thumbnail: 'string',
    type: 'string',
    tags: 'string',
    view: { type: 'string', columnType: 'int', defaultsTo: '0' },
    time_up: 'string',
    content_short: 'text',
    content_long: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    source: 'string',
    status: {
      type: 'string',
      defaultsTo: 'active'
    },
    created_by: 'string',
    numWord: { type: 'string', columnType: 'int', defaultsTo: '0' },
    numChar: { type: 'string', columnType: 'int', defaultsTo: '0' },
    levels: 'string',
    listversion: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    atr1: {
      type: 'string',
      columnName: 'link down'
    },
    atr2: 'string',
    url: 'string',
    atr3: 'string',
    atr4: 'string',
    atr5: 'string',
    atr6: 'string',
    atr7: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    atr8: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    atr9: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    atr10: {
      type: 'string',
      columnType: 'TEXT',
      allowNull: true,
    },
    atr11: {
      type: 'string'  // slide đại diện
    },
    slide: {
      type: 'string'  // check slide
    }

    // createdAt: { type: 'string', columnType: 'datetime', autoCreatedAt: true, },
    // updatedAt: { type: 'string', columnType: 'datetime', autoUpdatedAt: true, },
  },

};

sails.config.models.migrate = 'safe';
