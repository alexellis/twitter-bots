Twitter Bots
============

A basic staging area for Twitter bots.

* save_hashtag

Connects to Twitter streaming API for specified Hashtag and stores all Tweets to JSON files on hard drive.

* word_analysis

This tool processes a set of Tweets saved as JSON files and then performs a word analysis giving you the top keywords found for your recorded session.

#### Notes on limiting / troubleshooting

**Error: Status Code: 420**

The Twitter API will aggressively rate-limit how frequently you open and close connections. This is not ideal for a patchy internet connection or for frequent code changes. Try to do as much as you can disconnected or through unit testing.

Without due care and attention the 420 error can be prolonged from a few seconds to a few minutes and eventually your IP address can end-up being banned.

