#!/usr/bin/env node

module.exports = function (context) {

    var downloadFile = require('./downloadFile.js')
      , fileName = 'parse-sdk-android'
      , exec = require('./exec/exec.js')
      , Q = context.requireCordovaModule('q')
      , deferral = new Q.defer();

    console.log('Downloading Parse SDK for Android');

    downloadFile('https://www.parse.com/downloads/android/Parse/latest', 
      './'+ fileName +'.zip', function (err) {
      if (!err) {
        console.log('downloaded');
        exec('unzip ./' + 
         + '.zip -d ' + fileName, function (err, out, code) {
          console.log('expanded');
          var frameworkDir = context.opts.plugin.dir + '/src/android/';
          exec('mv ./' + fileName + '/Parse-*.jar ' + frameworkDir + '/Parse.jar', function (err, out, code) {
            console.log('moved Parse into ' + frameworkDir);
            exec('mv ./' + fileName + '/bolts-*.jar ' + frameworkDir + '/Bolts.jar', function (err, out, code) {
              console.log('moved Bolts into ' + frameworkDir);
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