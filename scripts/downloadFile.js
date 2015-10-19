#!/usr/bin/env node

var http = require('http')
  , https = require('https')
  , fs = require('fs');

module.exports = function(url, dest, cb) {

  https.get(url, function(res) {
    var response = '';

    res.on('data', function(d) {
      response += d;
    });

    res.on('end', function(d) {
      var redirectUrl = response.match(/<a href="(.+)">/)[1];
      var file = fs.createWriteStream(dest);

      http.get(redirectUrl, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(cb);  // close() is async, call cb after close completes.
        });
      }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
      });
    });
  });

};