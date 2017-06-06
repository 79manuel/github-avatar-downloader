var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = "79manuel";
var GITHUB_TOKEN = "a1c3e04d841148f14989435ba263c83ea68813ae";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request.get(requestURL,cb);


}//ends here function

getRepoContributors("jquery","jquery",function(error, result){

  console.log(result);
}); //getRepoContributors ends here


