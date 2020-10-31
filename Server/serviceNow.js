const axios = require('axios');
const geturl = 'https://dev19421.service-now.com/api/now/table/incident?sysparm_limit=1';
const url = 'https://dev19421.service-now.com/api/now/table/incident';
const btoa = require('btoa');

const user = 'admin';
const pwd = 'Summer2020@#';

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

let createIncidentTicket = () => {
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
                'short_description': 'Alarm is going off! Excess CPU Usage.'
            }
        }).then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("==================== ERROR ====================", error);
        })
}

module.exports = {pullIncidentTable, createIncidentTicket};