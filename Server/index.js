const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const serviceNow = require('./serviceNow');
const localtunnel = require('localtunnel');
const app = express();
const localPort = 8080;
app.use(bodyParser.urlencoded({ extended: false }))

let previousAWSID = '', previousGCPID = '';

//handler for receiving get request
app.get('/', (req, res) => {
  console.log('Received get request');

  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    let response = JSON.parse(data);
    console.log(response);
  });
})

//handler for receiving post request
app.post('/', (req, res) => {
  console.log('Received post request');

  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    let response = JSON.parse(data);
    console.log(response);

    // Checks if the alarm is from GCP or AWS
    if(response.incident !== undefined) {    // GCP
      if(response.incident.incident_id !== previousGCPID && response.incident.policy_name === 'CPU-Alarm') {
        previousGCPID = response.incident.incident_id;
        console.log('Creating Servicenow ticket');
        serviceNow.createIncidentTicket(true);
      }
    } else if(response.Type !== undefined) {    // AWS
      if (response.Type === 'SubscriptionConfirmation') {
        console.log(response.SubscribeURL);
        request(response.SubscribeURL, (error, response) => {
          if (!error && response.statusCode === 200) {
            console.log('Subscription has been confirmed.');
          }
        })
      }
      // Alarm
      if(response.Type === 'Notification'){
        if (response.MessageId !== previousAWSID && response.Subject.includes('ALARM')) {
          previousAWSID = response.MessageId;
          console.log('Creating Servicenow ticket');
          serviceNow.createIncidentTicket();
        }
      }
      
    }

  });
})

//create server on the port specified
const server = app.listen(localPort, () => {
  console.log('Server is on port ' + localPort);
})

//create a tunnel from the local port to a https public domain -- subdomains ('se4485-gr2'/'se4485cloudmonitoring'/'se4485-cloudmonitoring')
const attemptedTunnel = localtunnel(localPort, { subdomain: 'se4485cloudmonitoring' }, (err, successfulTunnel) => {
  if (err) {
    console.log('Unable to create tunnel.')
    process.exit(1);
  }
  console.log(successfulTunnel.url);
});

//graceful handling of ending the server, will output appropriate messages
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('uncaughtException', shutDown);
process.on('unhandledRejection', shutDown);
process.on('exit', shutDown);

function shutDown (signal) {
  console.log('\nReceived kill signal ' + signal + ', shutting down server.');
  attemptedTunnel.close();
}

attemptedTunnel.on('close', () => {
  console.log('URL has closed.');
  server.close();
})

server.on('close', () => {
  console.log('Local server has been stopped.');
  process.exit(0);
})