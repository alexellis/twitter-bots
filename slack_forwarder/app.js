"use strict"

// Needs a config.json file with slack and twitter keys/secrets/tokens.
// Sample config at end of file.

let util = require('util')
var Twitter = require('twitter');
let config = require('./config.json');
let async = require('async');
let fs = require('fs');

let Slackbots = require('slackbots');

var client = new Twitter(config.twitter);
var bot = new Slackbots(config.slack);
var stream = client.stream('statuses/filter', { track: process.argv[2] });
let queueSize = 5;

let forward_queue = async.queue((task, done) => {
    var posting = "Fowarding Tweet by (" + task.content.user.location + ")";
    console.log(posting);
    bot.postMessageToChannel(config.slack.channel, task.content.text, {}).then(() => {
        console.log("Posted..OK.");

        done();
    }).catch((e) => {
        done();
        return console.error(e);
    });
}, queueSize);

bot.on('start', () => {
    console.log("Slackbot and Twitter bots started. Let's watch the hashtag #" + process.argv[2])
    stream.on('data', (tweet) => {
        forward_queue.push({ content: tweet, id: tweet.id });
    });

    stream.on('error', function(e) {
        console.error(e);
        console.error(e.stack);
        process.exit(-1);
    });
});
