"use strict"

// Needs a config.json file with slack and twitter keys/secrets/tokens.
// Sample config at end of file.

let util = require('util')
var Twitter = require('twitter');
let config = require('./config.json');
let async = require('async');
let fs = require('fs');
let request = require('request');

if (process.argv.length != 4) {
    return console.error("usage: node app hashtag http://elastic_search_url/");
}

let elasticSearchUrl = process.argv[3];
var client = new Twitter(config.twitter);
var stream = client.stream('statuses/filter', { track: process.argv[2] });

let write_queue = async.queue((task, done) => {
    task.content["@timestamp"] = new Date(task.content["created_at"]).toISOString();
    request.post({ "uri": elasticSearchUrl, "body": task.content, "json": true }, (err, res, resBody) => {
        if (err) {
            console.error(err);
            process.exit(-1);
        }

        var posting = task.content.text + "\n @" + task.content.user.screen_name + " (" + task.content.user.location + ") " + task.content.user.lang;
        console.log("Posted to elastic search.");
        done();
    });
}, 10);

console.log("Bot started, let's watch the hashtag #" + process.argv[2])
stream.on('data', (tweet) => {

    write_queue.push({ content: tweet, id: tweet.id });
    console.log(tweet.text);
});

stream.on('error', function(e) {
    console.error(e);
    console.error(e.stack);
    process.exit(-1);
});
