# Add GitHub Milestones to your Calendar


## RUNNING THE NODE APP
```
npm install
node index.js
```
## Do it with Docker
```
docker run -d -p 3005:3005 citilogics/ical-github-generator:latest
```

## How do I use it? ##
When the service is running, you can subscribe to your repository's milestones using the following URL scheme:

```
// for public repos:
http://<serverip>:<port>/<owner_or_org_name>/<repo_name>

// for private repos (probably should use HTTPS):
http://<serverip>:<port>/private/<github_personal_access_token>/<owner_or_org_name>/<repo_name>

```

Which gives you a CalDav feed of milestone events for that repo. Make sure to set up a personal access token if you are accessing a private repo.
