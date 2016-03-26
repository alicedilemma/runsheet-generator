//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var coolIdeas = [];
coolIdeas.push("A family who are all secretly superheroes but haven't told each other");

//let a client GET the list of ideas
var sendIdeasList = function (request, response) {
  response.send(coolIdeas);
}
app.get('/ideas', sendIdeasList);

//let a client POST new ideas
var saveNewIdea = function (request, response) {
  console.log(request.body.idea); //write it on the command prompt so we can see
  coolIdeas.push(request.body.idea); //save it in our list
  response.send("thanks for your idea. Press back to add another");
}
app.post('/ideas', saveNewIdea);

//listen for connections on port 3000
app.listen(3000);
console.log("I am listening...");