There are two files:
  Index.js - loads server and localtunnel as an endpoint for cloud provider to send notifications to
  ServiceNow.js - sends api requests to servicenow api for our instance to manage incidents
  
To run:
  1) Download npm depedencies with "npm install <package>": 
    - body-parser
    - localtunnel
    - express
    - request
    - axios
    - btoa
  2) Navigate to folder containing index.js and run "node index.js"
