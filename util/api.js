const axios = require("axios");

const api = {
  getUser(username) {
    var queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`

    axios.get(queryUrl).then(function(res){
      
    });
    

  }
};

module.exports = api;
