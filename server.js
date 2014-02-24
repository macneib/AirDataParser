'use strict';

var fs = require('fs'),
  EventEmitter = require('events').EventEmitter,
  filesEE = new EventEmitter(),
  async = require('async'),
  //uuid = require('node-uuid'),
  rql = require('rql-promise'),
  r = require('rethinkdb');

var fileArray = [];
var NewfileArray = [];

var data = [];

var path = './old_data/';
var newpath = './new_data/';

// Connect
rql.connect({
  host: 'localhost',
  port: 28015,
  db: 'pcd',
  authKey: '',
  maxPoolSize: 10 // Max number of simultaneous DB connections
  // Set to 1 to disable pooling
});
function readAsync(file, callback) {
  fs.readFile(file, 'utf8', callback);
}
function parseObject(item, callback) {
  data = JSON.parse(item);

  console.log(data);

  // rql(r.table('airdata').insert(data)).
  // then(
  //   function(results) {
  //     //console.log(results);
  //     callback (results);
  //   },
  //   function(err) {
  //     callback (err);
  //   });
}
fs.readdir(path, function(err, files) {
  if (err) {
    throw err;
  }
  files.forEach(function(file) {
    // var resSplit = file.split('.');
    // console.log(resSplit);
    // var name = resSplit[0];
    // //console.log(name);
    // var sensor = resSplit[1];
    // var metric = resSplit[2];
    // fs.readFile(path + file, 'utf8', function(err, data) {
    //   if (err) {
    //     console.log('Error: ' + err);
    //     return;
    //   }
    //   //console.log(file);
    //   data = JSON.parse(data);
    //   //console.log(data.length);
    //   var modified = [];
    //   data.forEach(function(value) {
    //     // uncomment the following to generate UUIDs for each record
    //     //value.uuid = uuid.v4();
    //     value.name = name;
    //     value.sensor = sensor;
    //     value.metric = metric;
    //     modified.push(value);
    //     //console.log(modified);
    //     // comment to go fast, this for testing purposes only
    //   });
    //   //console.log(file);
    //   //console.log(modified);
    //   fs.writeFile(newpath + file, JSON.stringify(modified), function(err) {
    //     if (err) throw err;
    //     //console.log(modified);
    //     console.log(file + 'saved!');
    //   });
    // });
    // //console.log(modified);
    // filesEE.emit('files_ready');
    fileArray.push(path + file);
    NewfileArray.push(newpath + file);

  });
  async.map(fileArray, readAsync, function(err, data) {
    async.each(data, parseObject, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(NewfileArray);
      }
    });
  });
});