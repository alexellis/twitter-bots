Follows a hashtag and forwards tweets into an Elastic search endpoint as they as observed.

Example usage:
=============

```
node app.js docker http://elastic_search_url/
```


Docker usage:
=============

The hashtag and URL for Elastic Search are hard-coded in the Dockerfile for this example.

```
$ docker build -t elastic_forward .
$ docker run -d elastic_forward
```

Visual example:
===============

![](https://pbs.twimg.com/media/C0Chj1XWQAEUQQt.jpg)
