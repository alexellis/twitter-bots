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

Setting up a quick ELK stack
============================

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

Visual example:
===============

![](https://pbs.twimg.com/media/C0Chj1XWQAEUQQt.jpg)
