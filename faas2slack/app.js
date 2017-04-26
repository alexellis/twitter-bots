"use strict"

// Needs a config.json file with slack token for bot etc.
// Sample config at end of file.

let util = require('util')
let config = require('./config.json');
let async = require('async');
let fs = require('fs');
let Slackbots = require('slackbots');

let getStdin = require('get-stdin');

let bot = new Slackbots(config.slack);

getStdin().then( text => {
  handle(text, (err) => {
    if(err) return console.error(err);

    console.log("Done");
    process.exit(0);
  });
});

let handle = (text, done) => {
  let req = "Incoming message: "+text;
  let params = {
      icon_emoji: ":whale:"
  };

  bot.on('start', () => {
    bot.postMessageToChannel(config.slack.channel, req, params)
    .then(() => {
      console.log("Posted..OK.");
      done();
    }).catch((e) => {
      done(e);
    });
  });
};
