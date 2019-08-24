// Generated by CoffeeScript 2.4.1
(function() {
  "use strict";
  var fs, http, times;

  fs = require("fs");

  http = require("http");

  times = 20;

  http.createServer(function(req, res) {
    switch (req.url) {
      case "/":
      case "/index":
      case "/index.html":
        res.writeHead(200, {
          "content-type": "text/html"
        });
        return fs.readFile("./dist/index.html", function(err, data) {
          return res.end(data);
        });
      case "/download":
        console.log("start download");
        res.writeHead(200, {
          // "Connection": "keep-alive"
          "Connection": "close",
          "Content-Type": "text/plain",
          "Content-Length": times
        });
        return [...Array(times)].reduce(function(promise) {
          return promise.then(function() {
            return new Promise(function(resolve) {
              return setTimeout(function() {
                res.write('x');
                return resolve();
              }, 2000);
            });
          });
        }, Promise.resolve()).then(function() {
          res.end();
          return console.log("done");
        });
    }
  }).listen(8080, function() {
    return console.log("Start http server 8080");
  });

}).call(this);
