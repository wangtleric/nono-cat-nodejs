# nono-cat-nodejs

监控API：
  var express = require('express');
  var instance = express();
  var cat = require('nono-cat-nodejs')(instance);

业务指标API：
  cat.metric('xxxxx');

项目目录下新建文件 cat.config.js
