# FreeCodeCamp Api and microservice :computer:
This repo contains the solution of freeCodeCamp course (API AND MICROSERVICE)

### SECTIONS :PARTS:

# npm(node package manager)
 npm is package manager command line tool which is used to share and install different modules or package written in javascript.
 This tool  comes with node.js
 
 `npm init` 
 -> This command perform two function it create a new folder called node_modules and json file known as package.json.   
 
 ### package.json 
 This file gives the detailed information about the project like name,author,dependancies.
 It keeps track of the version of other package the project depends on ,so the project does'nt break if the dependent package update.

# MONGODB AND MONGOOSE
***what is mongodb?***
Well mongoDB is a non-relational database which helps to store data in json format which comes handy for Js developers.


***what is mongoose?***
mongoose is ODM (object data model) which helps to map the model object to mongodb data.


#### MongoDB and Mongoose - Install and Set Up Mongoose

### <ins>Solution</ins>

`.env file `

```MONGO_URI="mongodb+srv://usename:<password>@cluster0.zi93k.mongodb.net/<dbname>?retryWrites=true&w=majority" ```

`package.json`

Edit this dependencies object 

```"dependencies": {
		"body-parser": "^1.15.2",
		"express": "^4.12.4",
    "mongodb":"^3.6.0", // add a mongodb
		"mongoose": "^5.9.20" //add mongoose
    
  }
  ```
  
 
`app.js`

```
// Add mongodb and mongoose to the project's package.json. Then require 
// mongoose. Store your Mongo Atlas database URI in the private .env file 
// as MONGO_URI. Connect to the database using the following syntax:
//
const mongoose = require("mongoose"); // first import the mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });  // connect to database

```
#### MongoDB and Mongoose - Create a Model

### <ins>Solution</ins>
`app.js`
```
const Schema=mongoose.Schema; // it returns the constructor Called Schema
//Schema is constructor method which maps to mongo db collection and define the structure of document.
  const personSchema = new Schema({  
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
}); // creating the structure of document 
  const Person = mongoose.model("Person", personSchema); // create a model with name Person
  // model is a constructor compiled from schema.The first arguement pass to model() is name of collection on which model will be defined.
```

#### Create and Save a Record of a Model

### <ins>Solution</ins> 
`app.js`

```
const Schema=mongoose.Schema;
  const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
  const Person = mongoose.model("Person", personSchema);
  var createAndSavePerson = function(done) {
  var eachPerson = new Person({
    name:"vipin",
    age:22,
    favoriteFoods:["burger","pizza"]
  }) // model creates an instance which is actually a document of our collection .
  eachPerson.save(function(err,data){
    if (err) return console.error(err);
    done(null, data)
  }) // saving the document 
  

};
```

#### Create Many Records with model.create()

### <ins>Solution</ins>

`app.js`

```
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  
    Person.create(arrayOfPeople,function (err,data){
      if(err) console.error(err);
       done(null, data)
    }) // Model.create()(Person.create) can create many instances(document) at one time.The function takes array of object ,single object and a callback. 
    
    
};
```
[Check more about models here](https://mongoosejs.com/docs/models.html)

#### Use model.find() to Search Your Database

### <ins>Solution</ins>

`app.js`

```
var personName = "vipin";
var findPeopleByName = function(personName, done) {
  
  Person.find({name : personName},function(err,data){
    if(err){
      console.error(err)
    }
    done(null,data)
  }) // model.find() takes two arguement object and a callback,sometime we don't use callbacks , in that case we use model.find().exec() to excute the query.
// Remeber this method runs asynchronously so this should be used within async function.
};
```

[Model.find()](https://mongoosejs.com/docs/api.html#model_Model.find)

#### Use model.findOne() to Return a Single Matching Document from Your Database

### <ins>Solution</ins>

`app.js`

```
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  }); // It returns a single object
 
};
```


