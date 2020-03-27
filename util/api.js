const axios = require("axios");
require("dotenv").config();
const api = {
  getUser(username) {
    var queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

    return axios
      .get(queryUrl)
      .catch(err => {
        console.log(`User not found`);
        process.exit(1);
      });
  }
};

module.exports = api;