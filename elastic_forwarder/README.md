elastic_forwarder
=================

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

This docker-compose.yml file will give you a complete working stack that can be pointed to from your Dockerfile or Node.js code. The port for Elastic Search is 9200. The image is huge, but contains all three components needed (logstash, kibana and elastic search (ES) - ES runs in Java so it will need large amount of free memory).

For more information on ELK or Elastic Search:

* [A combined ELK stack in a single Docker image](https://elk-docker.readthedocs.io/#installation)
* [Elastic Search official docs](https://www.elastic.co/guide/en/elasticsearch/reference/1.3/search-search.html)

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

* [docker-compose.yml](https://github.com/alexellis/twitter-bots/blob/master/elastic_forwarder/elk/docker-compose.yml)

If you have trouble getting this to work, then you may need to run `sudo sysctl -w vm.max_map_count=262144`

Visual example:
===============

![](https://pbs.twimg.com/media/C0Chj1XWQAEUQQt.jpg)
