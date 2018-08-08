const ical = require('ical-generator');
var express = require('express');
var app = express()
const cal = ical({domain: 'github.com', name: 'my first iCal'});
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github

const event = cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    summary: 'Example Event',
});

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_ACCESS_TOKEN
})


app.get('/Citilogics/datalyzer', function (req, res) {
  console.log(new Date() + " accessing /Citilogics/datalyzer")
  octokit.issues.getMilestone({
    owner: 'Citilogics',
    repo: 'datalyzer',
    number: 1
  }).then(({data, headers, status}) => {
    event.summary(data.description)
    event.start(moment(data.created_at).startOf('day'))
    event.end(moment(data.created_at).add(1, 'days').startOf('day'))
    cal.serve(res)
  }).catch((error) => {
    console.log("ERROR : " + error)
  })

})

app.listen(3005, () => console.log('listening on port 3005!'))
