This tool processes a set of Tweets saved as JSON files and then performs a word analysis giving you the top keywords found for your recorded session.

Extending the work
==================

Potential extensions could be:

* Node.js stream or socket to provide data between capture point and analysis tool.
* Smart filtering for specific languages or character sets
* Extending the stop-word dictionary
* Applying a weighting to each tweet within the document via TD-IDF
* Creating a set of documents with the ELK-stack (Elastic Search) for searching Tweets or keywords.

Sample output
=============

Here is some sample output from the tool:

```
# echo ; node app.js ../save_hashtag/tweet_tea/|tail -n 25

10 [new] 
10 [server] 
10 [webinar] 
11 [datacenter] 
11 [ddc] 
11 [dockercaptain] 
12 [@jgamblin] 
12 [kubernetes] 
12 [multihost] 
12 [networking] 
12 [run] 
13 [developers] 
13 [java] 
16 [f4f rss] 
17 [devops] 
17 [web] 
17 [windows] 
18 [container] 
19 [internationalteaday] 
19 [like] 
19 [security] 
21 [linux] 
33 [containers] 
64 [@docker] 
200 [docker]
```
