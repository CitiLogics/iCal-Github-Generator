# ADD GITHUB MILESTONE EVENTS TO YOUR CALENDAR #


## RUNNING THE NODE APP ##
```
npm install
node index.js
```

## How do I use it? ##
when the service is running it accepts end points in the following format

```
// for public repos:
<serverip>/<owner_or_org_name>/<repo_name>

// for private repos:
<serverip>/private/<github_personal_access_token>/<owner_or_org_name>/<repo_name>

```

Which gives you a CalDav feed of milestone events for that repo. Make sure to have access token in env variables of the node server if you are accessing a private repo.
