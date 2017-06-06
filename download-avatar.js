var GITHUB_USER = "79manuel";
var GITHUB_TOKEN = "a1c3e04d841148f14989435ba263c83ea68813ae";

var request = require('request');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  console.log(options);
  request(options, function(err, response, body){
    if (err || (response && response.statusCode != 200)) {
      console.log('error:', err);
      console.log('response status code:', response.statusCode);
      console.log('response:', response.body.message);
      throw err;
    } else {
      cb(err, body);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  console.log("URL: " + url + ", filepath: " + filePath);
}

getRepoContributors(repoOwner, repoName, function(err, body) {
  let parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    downloadImageByURL(parsedResults[i]["avatar_url"], `avatar/${i}.jpg`);
  }
});




