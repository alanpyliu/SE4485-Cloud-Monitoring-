const axios = require('axios');
const instanceNum = '99907'
const geturl = 'https://dev' + instanceNum + '.service-now.com/api/now/table/incident?sysparm_limit=1';
const url = 'https://dev' + instanceNum + '.service-now.com/api/now/table/incident';
const btoa = require('btoa');

const user = 'admin';
// const pwd = 'Summer2020@#';
const pwd = 'Summer2020';

let pullIncidentTable = () => {
    axios.get(geturl,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user + ':' + pwd)
            }
        }).then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("==================== ERROR ====================", error);
        })
}

let createIncidentTicket = (isGCP = false) => {
    let desc = isGCP ? 'Alarm is going off for GCP instance! Excess CPU Usage.' : 'Alarm is going off for AWS instance! Excess CPU Usage.';
    axios(url,
        {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(user + ':' + pwd),
            },
            data: {
                'short_description': desc
            }
        }).then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("==================== ERROR ====================", error);
        })
}

module.exports = { pullIncidentTable, createIncidentTicket };