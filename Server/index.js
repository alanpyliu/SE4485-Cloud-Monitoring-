const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false}))

// app.get('/', (req, res) => {
//   console.log('Received get request')
//   var data='';
//   req.setEncoding('utf8');
//   req.on('data', function(chunk) { 
//      data += chunk;
//   });

//   req.on('end', function() {
//       console.log(data)
//   });
// })
app.post('/', (req, res) => {
  console.log('Received post request')
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });

  req.on('end', function() {
      console.log(data)
  });
})

app.listen(port, () => {
  console.log('Server is on port ' + port)
})