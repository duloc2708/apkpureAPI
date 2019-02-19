const request = require('request');
const path = require('path');
const fs = require('fs');
let mkdirp = require('mkdirp');
const saveFileBase64 = (data, filename, dest) => {
  return new Promise((resolve, reject) => {
    var imgdata = data
    let link = imgdata.replace('!', ',');
    let dataImg = link.split(';base64,').pop()
    let type = link.split(';')[0].split('/')[1]
    let imageName = dest + filename + '.' + type
    let buf = new Buffer(dataImg, 'base64');
    fs.writeFile(imageName, buf, (error) => {
      if (error) return reject(err)
      resolve(imageName)
    });
  })

}
module.exports = {
  saveFileBase64
}