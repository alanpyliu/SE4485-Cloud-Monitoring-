There are two files in Server:
Index.js - loads server and localtunnel as an endpoint for cloud provider to send notifications to
ServiceNow.js - sends api requests to servicenow api for our instance to manage incidents

To run:

1. Download npm depedencies with the command: npm install body-parser localtunnel express request axios btoa
2. Navigate to folder containing index.js and run "node index.js"

\*\*Cloud_formation_template_aws.json file contains the JSON template for creating an AWS Linux instance with an alarm that is set off by excessive CPU Utilization.
