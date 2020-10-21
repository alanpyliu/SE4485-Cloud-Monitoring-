// index.js
const http = require('http');

// declare server variables
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  req.on('data', (data) => {
    console.log("Received a notification")
    console.log(data)
  })

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

//https://tasty-eel-78.loca.lt:3000