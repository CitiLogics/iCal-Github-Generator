const ical = require('ical-generator');
var app = require('express')();
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github
const _ = require('underscore')



app.get('/', function(req, res) {
  console.log(new Date() + "accessing /")
  res.status(200).send('nothing to see here')
});

app.get('/private/:gh_token/:owner/:repo', function (req, res) {
  let auth = {
    type: 'token',
    token: req.params.gh_token
  };
  return getMilestoneCalendar(req,res,auth);
});

app.get('/:owner/:repo', function (req, res) {
  return getMilestoneCalendar(req,res);
});

let getMilestoneCalendar = function(req, res, auth) {
  if (auth) {
    octokit.authenticate({
      type: 'token',
      token: req.params.gh_token
    });
  }
  console.log(new Date() + " accessing /" + req.params.owner + "/" + req.params.repo)
  octokit.issues.getMilestones({
    owner: req.params.owner,
    repo: req.params.repo,
    state: 'open'
  }).then(({data, headers, status}) => {
    let events = _.map(data, (e) => {
      return {
        summary: e.title,
        start: moment(e.due_on).startOf('day'),
        allDay: 'true',
        description: e.description,
        url: e.html_url
      };
    });
    console.log(events);
    const cal = ical({
      name: 'GITHUB: '+ req.params.repo,
      events: events
    })
    cal.serve(res)
  }).catch((error) => {
    console.log("ERROR : " + error)
  })
}
app.listen(3005, () => console.log('listening on port 3005!'))
