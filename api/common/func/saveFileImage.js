const request = require('request');
const path = require('path');
const fs = require('fs');
let mkdirp = require('mkdirp');
const saveFileImage = (url, filename, dest) => {
  mkdirp(dest, function (err) {
    if (err) console.error(err)
  });
  request({ url: url, encoding: null }, (err, res, body) => {
    if (body && res.statusCode === 200) {
      if (!path.extname(dest)) {
        dest = path.join(dest, filename)
      }
      fs.writeFile(dest, body, 'binary', (err) => {
        if (err) return err
        fs.chmod(dest, 0777, (err2) => {
          if (err2) throw err2;
        })

      })
    }
  })
}
module.exports = {
  saveFileImage
}