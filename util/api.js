// Import the needed node libraries
const axios = require("axios");
require("dotenv").config();

// Define the object that will be exported
const api = {
  // Function that calls the github API and retrieves user data for the given username
  getUser(username) {
    // Build the query url for the github API
    var queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

    // Return the axios call
    return axios
      .get(queryUrl)
      .catch(err => {
        console.log(`User not found`);
        process.exit(1);
      });
  }
};

module.exports = api;