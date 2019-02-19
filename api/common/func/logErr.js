var fs = require('fs')
const logErr = (funcName,err) => {
    let dateCurrent = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    var fs = require('fs');
    var data = fs.readFileSync('log.txt').toString().split("\n");
    data.splice(0, 0, funcName + ' - ' + dateCurrent + ': ' + err);
    var text = data.join("\n");
    fs.writeFile('log.txt', text, function (errFs) {
        if (errFs) return errFs;
    });
}
module.exports = {
    logErr
}