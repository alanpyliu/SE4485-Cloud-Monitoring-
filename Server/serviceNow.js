const axios = require('axios')
const url = 'https://dev63377.service-now.com/api/now/table/incident?sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=number%2Cshort_description'

const user = 'admin'
const pwd = 'Winter2020@#'

function pullIncidentTable () {
    axios.post(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user + ':' + pwd).toString('base64'),
            }
        }).then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log("==================== ERROR ====================", error);
        })
}

function createIncidentTicket () {
    
}

module.exports = {pullIncidentTable, createIncidentTicket}