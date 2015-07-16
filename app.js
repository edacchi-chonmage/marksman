var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var markdown = require('markdown-js');
var watch = require('node-watch');
var fs = require('fs');
var path = require('path');

var filename = 'test.md';

var readMd = function () {
  fs.readFile(filename, 'utf8', function (err, text) {
    io.emit('hoge', markdown.makeHtml(text));
  });
};

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

http.listen(3000, function () {
});

io.on('connection', function (socket) {
  watch(filename, function () {
    readMd();
  });
});

// console.log(markdown.makeHtml('- [x] hoge'));
