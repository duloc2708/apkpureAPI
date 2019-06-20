let cheerio = require('cheerio');
var progress = require('request-progress');
var rp = require('request-promise');
var rpdetail = require('request-promise');
let lstArticles = [];
var fs = require('fs');
var request = require('request');
const { convertSlug } = require('./func');
var cloudscraper = require('cloudscraper');

let idGame = 'com.rovio.angrybirdsrio'
var options = {
  uri: `https://apps.evozi.com/apk-downloader/?id=${idGame}`,
  transform: function (body) {
    console.log('body', body)
    return cheerio.load(body);
  }
};
exports.Data = function () {
  var options = {
    uri: `https://apps.evozi.com/apk-downloader/?id=${idGame}`
  };

  cloudscraper.get(options).then(console.log).catch(console.error);
  return lstArticles;
};