require('dotenv').config();
// import the required libraries
const fs = require("fs");
const inquire = require("inquirer");
const api = require("./util/api.js");
const genMark = require("./util/generateMarkdown.js")
const util = require("util")
var title = "";

// Convert functions into promise based functions so can call them in order later
// const getUserAsync = util.promisify(api.getUser);
// const genMarkAsync = util.promisify(genMark);
const writeFileAsync = util.promisify(writeToFile);

// Array of questions to feed into inquirer
const questions = [{
    message: "Enter your GitHub username: ",
    name: "username"
},
{
    message: "What is the repo name that you would like to generate a README for?: ",
    name: "project"
},
{
    message: "What license should this project have?: ",
    name: "license"
},
{
    message: "Please give a short description for the README: ",
    name: "description"
},
{
    message: "What command should be run to install any dependencies?: ",
    name: "install"
},
{
    message: "Please give usage instructions: ",
    name: "usage"
},
{
    message: "Who else contributed to this project?: ",
    name: "credits"
},
{
    message: "What command should be used to run tests?: ",
    name: "test"
}];

// Function that will write the given data into a file.
function writeToFile(fileName, data) {
    console.log("Writing file.");
    fs.writeFile(fileName,data,function(error){});
}

// Main function that initializes the program
function init() {

    var askQuestions = inquire.prompt(questions);

    // Ask user for their username and which repo they want to create a README for.
    askQuestions
        .then(function (response) {
            // Call the function to get the user data from the api and return it as part of the promise
            console.log("username", response.username);
            api.getUser(response.username)
                // Then, after the api call is done, pass the userdata to the markdown function that stores that data in a string
                .then(function (userData) {
                    // Grab the data from the axios result
                    var user = userData.data;
                    // Build an object with data to write to the README
                    var readmeData = {
                        title: response.project,
                        github: user.login,
                        license: response.license,
                        description: response.description,
                        installation: response.install,
                        usage: response.usage,
                        contributing: response.credits,
                        test: response.test,
                        avatar_url: user.avatar_url,
                        url: user.html_url,
                        email: user.email
                    };
                    // Call the function that generates the string to write to the README
                    return genMark(readmeData);
                })
                // Pass the created string to the function that writes the README file.
                .then(function (fileData) {
                    // Write the file to an output folder so that it doesn't overwrite the current files.
                    writeToFile(`./output/${response.project}README.md`, fileData);
                })
                .catch(function (error) {
                    throw error;
                })
        });
}

init();
