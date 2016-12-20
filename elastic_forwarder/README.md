This bot follows a hashtag from Twitter's streaming API and then forwards them straight into an Elastic search endpoint as they are indexed. The indexed Tweets can then be used in a graphical interface called Kibana to:

* Create a tag cloud
* Search for topics / trends
* Perform big data analysis
* Create attractive charts to share with marketing / followers on Twitter.

Example usage:
=============

```
node app.js docker http://elastic_search_url/tweets/tweet/
```


Docker usage:
=============

The hashtag and URL for Elastic Search are hard-coded in the Dockerfile for this example.

```
$ docker build -t elastic_forward .
$ docker run -d elastic_forward
```

Setting up a quick ELK stack
============================

This docker-compose.yml file will give you a complete working stack that can be pointed to from your Dockerfile or Node.js code. The port for Elastic Search is 9200.

```
elk:
  image: sebp/elk
  ports:
    - "5601:5601"
    - "9200:9200"
    - "5044:5044"
  volumes:
    - /dev/shm:/dev/shm
  environment:
    - es.bootstrap.seccomp=false
    - bootstrap.ignore_system_bootstrap_checks=true
  security_opt:
    - seccomp:unconfined 
```

*docker-compose.yml*

Visual example:
===============

![](https://pbs.twimg.com/media/C0Chj1XWQAEUQQt.jpg)
