// import axios to make the API call
const axios = require("axios");

// Create an export variable with the API call
const api = {
  // Function to call the Github API
  getUser(username) {
    var queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res){
      console.log(res.data);
      return res.data;
    }).catch(function(error){
      throw error;
    });
  }
};

module.exports = api;
