// index.js
const http = require('http');
const serviceNow = require('./serviceNow')

// declare server variables
//const hostname = '127.0.0.1';
//const port = 8080;

const server = http.createServer((req, res) => {
  req.on('data', (data) => {
    console.log("Received a notification");
    console.log("test");
    console.log(data);
  })

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
}).listen(8080); 
// hello zach
