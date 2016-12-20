Twitter Bots
============

This is a development repository for Twitter bots. I've incldued a few examples to get you started.

* save_hashtag

Connects to Twitter streaming API for specified Hashtag and stores all Tweets to JSON files on hard drive.

* word_analysis

This tool processes a set of Tweets saved as JSON files and then performs a word analysis giving you the top keywords found for your recorded session.

* elastic_forwarder

This bot streams a certain Hashtag and immediately forwards the messages on to an Elastic Search instance, you can then monitor the tweets in real-time - checking for trends and activity around the globe.

* slack_forwarder

This bot provides a bridge between Twitter and your favourite Slack channel. In the example messages are posted into the #general channel, but 
you will probably want to create a dedicated channel that people can opt/in out of. Bear in mind that you could also do processing on the Tweeet before forwarding it - or even filter out unwanted/wanted material.


#### Notes on limiting / troubleshooting

**Error: Status Code: 420**

The Twitter API will aggressively rate-limit how frequently you open and close connections. This is not ideal for a patchy internet connection or for frequent code changes. Try to do as much as you can disconnected or through unit testing.

Without due care and attention the 420 error can be prolonged from a few seconds to a few minutes and eventually your IP address can end-up being banned.

