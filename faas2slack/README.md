FaaS serverless function - posts messages to Slack
==========================

This is a FaaS serverless function to post messages to a Slack channel. You can integrate it with another function or a RAW webhook.

### Build this function

First populate config.json using the example as a template.

```
# docker build -t slack_function . 
```

### Deploy the function

Head over to the FaaS UI at http://localhost:8080 and click Create New Function.

Specify:

* the image name: `slack_function`
* the service: `slackbot`
* the process `node app.js`
* the network of `func_functions`

Now test the forwarder out in the UI. It should look a bit like this:

![](https://pbs.twimg.com/media/C-W9xtWWAAARm6w.jpg:large)
