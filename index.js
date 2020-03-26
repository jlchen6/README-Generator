// import the required libraries
var fs = require("fs");
var inquire = require("inquirer");
var api = require("./util/api.js");

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
    
}

// Main function that initializes the program
function init() {
    // Ask user for their username and which repo they want to create a README for.
    inquire.prompt(questions).then(function({username, project}){
        // Call the function to get the user data from the api
        var userData = api.getUser(username);
        // Then, after the api call is done, pass the userdata to the markdown function that stores that data in a string

        // Pass the created string to the function that writes the README file.
    })

}

init();
