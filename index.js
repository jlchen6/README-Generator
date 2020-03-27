require('dotenv').config();
// import the required libraries
const fs = require("fs");
const inquire = require("inquirer");
const axios = require("axios");
// const api = require("./util/api.js");
const genMark = require("./util/generateMarkdown.js")
const util = require("util")
var title = "";

// Convert functions into promise based functions so can call them in order later
// const getUserAsync = util.promisify(api.getUser);
const genMarkAsync = util.promisify(genMark);
const writeFileAsync = util.promisify(writeToFile);

const config = { headers: { accept: "application/json" } };

// Array of questions to feed into inquirer
const questions = [{
    message: "Enter your GitHub username: ",
    name: "username"
},
{
    message: "What is the repo name that you would like to generate a README for?: ",
    name: "project"
}];

// Function that will write the given data into a file.
function writeToFile(fileName, data) {
    console.log("Writing file.")
}

function getUser(username) {
    var queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

    axios.get(queryUrl, config)
    .then(function(res) {
      console.log(res.data);
      // Then, after the api call is done, pass the userdata to the markdown function that stores that data in a string
      return genMarkAsync(res.data);
    })
    // Pass the created string to the function that writes the README file.
    .then(function (fileData) {
        console.log("reached genMark");
        return writeFileAsync("README.md", fileData);
    })
    .then(function () {
       console.log("Finished writing README!");
    })
    .catch(function(error){
      throw error;
    });
  }

// Main function that initializes the program
function init() {

    var askQuestions = inquire.prompt(questions);

    // Ask user for their username and which repo they want to create a README for.
    askQuestions
        .then(function (response) {
            // Call the function to get the user data from the api and return it as part of the promise
            console.log("getting user data");
            title = response.project;
            getUser(response.username);
        })
        .catch(function (error) {
            throw error;
        })
}

init();
