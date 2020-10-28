const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const serviceNow = require('./serviceNow');
const localtunnel = require('localtunnel');
const app = express();
const localPort = 8080;

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => {
  console.log('Received get request')
  
  let data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });

  req.on('end', function() {
    let response = JSON.parse(data)
    console.log(response)
  });
})

app.post('/', (req, res) => {
  console.log('Received post request')
  
  let data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });

  req.on('end', function() {
    let response = JSON.parse(data)
    console.log(response)

    if(response.NewStateValue === 'ALARM') {
      console.log('creating ticket')
      serviceNow.createIncidentTicket()
    }
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

const server = app.listen(localPort, () => {
  console.log('Server is on port ' + localPort)
  const attemptedTunnel = localtunnel(localPort, {subdomain: 'cloudmonitoring'}, (err, successfulTunnel) => {
    if (err){
      console.log('Unable to create tunnel.')
    }
    console.log(successfulTunnel.url);
  });
  attemptedTunnel.on('close', () => {
    console.log('URL has closed.');
  });
})

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('\nReceived kill signal, shutting down server.');
  server.close();
  process.exit();
}