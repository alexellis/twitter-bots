"use strict"

let fs = require('fs');
let async = require('async');
let stopwords = require('./stopwords.json');

class Counter {
  constructor() {
    this.hash = {}
  }

  incr(word) {
    if(!this.hash[word]) {
      this.hash[word] = 0;
    }
    this.hash[word]++;
  }
  get words(){
    return this.hash;
  }
}

class Parser {
  constructor(exclude) {
    this.exclude = exclude;
  }

  _sanitizeWord(tweet) {
    tweet = tweet.replace(/\./g,"");
    tweet = tweet.replace("…", "");
    tweet = tweet.replace(/\,/g,"");
    tweet = tweet.replace("|"," ");
    tweet = tweet.replace("/","");
    tweet = tweet.replace("?","");
    tweet = tweet.replace(/\"/g,"");
    tweet = tweet.replace(/\`/g,"");
    tweet = tweet.replace(/\]/g,"");
    tweet = tweet.replace(/\#/g,"");
    tweet = tweet.replace(/\!/g,"");
    tweet = tweet.replace(/\”/g,"");
    tweet = tweet.replace(/\-/g,"");
    tweet = tweet.replace(/\(/g,"");
    tweet = tweet.replace(/\)/g,"");
    tweet = tweet.replace(/\:/g,"");

    tweet = tweet.replace(/\“/g,"");
    tweet = tweet.replace(/\[/g,"");

    tweet = tweet.replace(/\n/g," ");
    tweet = tweet.replace("  ","");

    if(tweet.substring(tweet.length-1)==".") {
      tweet = tweet.substring(0,tweet.length-1);
    }
    
    return tweet.trim();
  }

  parse(tweet) {
    var content = [];

    var words = tweet.split(" ");
    for(var i =0;i<words.length;i++) {
      var word = words[i].toLowerCase();
      if(word.indexOf('http') !=0) {
        word = this._sanitizeWord(word);
        if(word.length >1&& stopwords.indexOf(word)==-1) {
          content.push(word);
        }
      }
    }

    return content;
  }
}

let parser = new Parser(stopwords);
let counter = new Counter();
let minCount = process.env.MIN_COUNT || 1;

let q = async.queue((task, done) => {
    fs.readFile(task.file, "utf8", (err, file) => {
      var tweet = JSON.parse(file);
      //console.log(tweet.text);
      var words = parser.parse(tweet.text);
      words.forEach((w) => {
        counter.incr(w);
      });

      // console.log( tweet.text.split("docker").length  + " times");
      done();
    });
}, 10);

q.drain = function() {
  var keys = Object.keys(counter.words);
  let sorted = keys.sort(function(x,y) {
    if(counter.words[x]==counter.words[y]) {
      return x.localeCompare(y);
    }
    if(counter.words[x]<counter.words[y]) {
      return -1;
    }
    if(counter.words[x]>counter.words[y]) {
      return 1;
    }
  });

  sorted.forEach((word)=> {
    if(counter.words[word] >= minCount) {
        console.log( counter.words[word]+ " ["+word + "] ");
    }
  });
  // console.log(counter);
}

let dir = "../tweets";

if(process.argv.length==3) {
  dir = process.argv[2];
} else {
  console.error("Give a tweet directory as an argument");
  return process.exit(-1);
}


fs.readdir(dir, (err, files)=> {
  if(err) {
    return console.error(err);
  }
  files.forEach((file)=> {
    q.push({file: dir + "/" + file});
  });
});

