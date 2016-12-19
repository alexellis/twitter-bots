This bot makes use of the `twitter` npm module and the Twitter streaming API.

We connect to the `statuses/filter` endpoint for a specific Hashtag that is the first argument on the command line.

* Installation

This requires Node.js

```
# npm install
```

* Running:

Make sure you update the following in `config.json`. To obtain your keys create an application on the Twitter apps portal.

```
{
  "twitter": {
    "consumer_key": "",
    "consumer_secret": "",
    "access_token_key": "",
    "access_token_secret": ""
 }
}
```

Here's how you start to have the docker hashtag.

```
# mkdir -p ./tweets
# node app.js docker
```
