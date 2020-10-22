const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false}))

app.post('/', (req, res) => {
  console.log('Received post request')
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });

  req.on('end', function() {
    response = JSON.parse(data)
    if(response.Type === 'SubscriptionConfirmation') {
      console.log(response.SubscribeURL)
      request(response.SubscribeURL, (error, response, body) => {
        if(!error && response.statusCode === 200){
          console.log('Subscription has been confirmed.')
        }
      })
    }
  });
})

app.listen(port, () => {
  console.log('Server is on port ' + port)
})