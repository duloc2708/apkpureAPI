//import { setTimeout } from 'timers';

var express = require('express');
var app = express();

var job = require('node-cron');
var i = 1;

job.schedule('*/15 * * * *', async function () {
  let getGame = require('./request/requestGame.js');
  let rqGame = await getGame.Data();
});
;


app.listen(3009);
