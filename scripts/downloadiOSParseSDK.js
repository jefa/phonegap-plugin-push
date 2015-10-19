#!/usr/bin/env node

module.exports = function (context) {

    var downloadFile = require('./downloadFile.js')
      , fileName = 'parse-sdk-ios'
      , exec = require('./exec/exec.js')
      , Q = context.requireCordovaModule('q')
      , deferral = new Q.defer();

    console.log('Downloading Parse SDK for iOS');

    downloadFile('https://www.parse.com/downloads/ios/parse-library/latest', 
      './'+ fileName +'.zip', function (err) {
      if (!err) {
        console.log('downloaded');
        exec('unzip ./' + fileName + '.zip -d ' + fileName, function (err, out, code) {
          console.log('expanded');
          var frameworkDir = context.opts.plugin.dir + '/src/ios/';
          exec('mv ./' + fileName + '/Parse.framework ' + frameworkDir, function (err, out, code) {
            console.log('moved Parse.framework into ' + frameworkDir);
            exec('mv ./' + fileName + '/Bolts.framework ' + frameworkDir, function (err, out, code) {
              console.log('moved Bolts.framework into ' + frameworkDir);
              exec('rm -r ./' + fileName, function (err, out, code) {
                console.log('Removed extracted dir');
                exec('rm ./' + fileName + '.zip', function (err, out, code) {
                  console.log('Removed downloaded Parse SDK');
                  deferral.resolve();
                });
              });
            });
          });
        });
      }
    });

    return deferral.promise;

};