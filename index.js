var fs = require("fs");
var inquire = require("inquirer");
var api = require("./util/api.js")

const questions = [{
    message: "Enter your GitHub username: ",
    name: "username"
}];

function writeToFile(fileName, data) {
    
}

function init() {
    inquire.prompt(questions).then(function({username}){
        api.getUser(username);
    })

}

init();
