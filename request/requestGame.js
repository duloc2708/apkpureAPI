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
exports.Data = function () {
  var options = {
    uri: `https://apps.evozi.com/apk-downloader/?id=${idGame}`
  };
  cloudscraper.get(options).then((result) => {
    let $detail = cheerio.load(result);
    let html = $detail('.container:nth-child(2)').html()
    var scripttext = html
    var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    var match;
    let stringScript = ''
    while (match = re.exec(scripttext)) {
      if (match[1].indexOf('addClicker') != -1) {
        stringScript = match[1]
      }
    }
    // console.log('stringScript', stringScript);
    let objText = stringScript.substring(0, stringScript.lastIndexOf('$.ajax({'));
    let objTemp = objText.match(/[^{]*$/)[0];
    objTemp = '{' + objTemp.substring(0, objTemp.lastIndexOf(',')) + '}'
    objTemp = objTemp.replace(/ /g, '')
    objTemp = objTemp.replace(/{/g, '{"')
    objTemp = objTemp.replace(/}/g, '"}')
    objTemp = objTemp.replace(/:/g, '":"')
    objTemp = objTemp.replace(/,/g, '","')

    // get params1
    let text = stringScript.substring(0, stringScript.lastIndexOf('var version_desc = '));
    let param1 = text.match(/[^=]*$/)[0];
    param1 = param1.replace(';', '')
    param1 = param1.replace(/'/g, '')
    if (param1) param1 = param1.trim();

    let objData = JSON.parse(objTemp)
    objData[Object.keys(objData)[0]] = idGame;
    objData[Object.keys(objData)[2]] = param1;

    var options2 = {
      uri: `https://api-apk.evozi.com/download`,
      formData: objData
    };
    console.log('objData..>', objData);

    cloudscraper.post(options2).then((result2) => {
      let data = JSON.parse(result2)
      console.log('data..>', data);
      
      
    })

  })
    .catch(console.error);
  return lstArticles;
};