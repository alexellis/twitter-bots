"use strict"

var Twitter = require('twitter');
let config = require('./config.json');
let fs = require('fs');
let verbose = true;

if(process.argv.length != 3) {
  console.error("Pass a hashtag as an argument:\n app.js docker");
  return process.exit(-1);
}

let hashtag = process.argv[2];
var client = new Twitter(config.twitter);
var stream = client.stream('statuses/filter', {track: hashtag});

let print = (tweet) => {
  var summary = tweet.text +
      "\n @" + tweet.user.screen_name +
      " ("+tweet.user.location+") "+ tweet.user.lang;
  console.log(summary);
};

console.log("Bot started, let's watch the hashtag #"+hashtag)
stream.on('data', (tweet) => {
  if(verbose) print(tweet);
  let content = JSON.stringify(tweet);
  let file = "tweets/" + tweet.id +  ".json";
  fs.writeFile(file, content, (err) => {
    if(err) {
      return console.error(err);
    }
    console.log("Tweet: "+ tweet.id + " written.");
  });
});

stream.on('error', function(e) {
  console.error(e, e.stack);
  process.exit(-1);
});
