var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = "79manuel";
var GITHUB_TOKEN = "a1c3e04d841148f14989435ba263c83ea68813ae";
var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {

    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }

  request.get(options,cb);


}//ends here function

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  console.log("URL: " + url + ", filePath: " + filePath);
}
getRepoContributors(repoOwner,repoName,function(error, result) {
  var avatarData = JSON.parse(result);
  for (var i = 0; i < avatarData.length; i++) {
    downloadImageByURL(avatarData[i],['avatar_url'], 'avatar/$[i].jpg' )
  }
  console.log(result);
}); //getRepoContributors ends here


