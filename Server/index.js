// index.js
const http = require('http');
const serviceNow = require('./serviceNow')
const fs = require('fs')

// declare server variables
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {

  console.log("Got request")
//   var body = '';
//   req.on('data', (chunk) => {
//     body += chunk;
//   });

//   req.on('end', () => {
//     fs.writeFile('file.json', body, 'utf8');
//     res.end('{"msg": "OK"}');
// })
  console.log(req)
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World\n');
  //console.log('test');
}).listen(port);