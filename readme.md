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

#### Use model.findById() to Search Your Database By _id

### <ins>Solution</ins>

`app.js`

```
// When saving a document, mongodb automatically add the field `_id`,
// and set it to a unique alphanumeric key. Searching by `_id` is an
// extremely frequent operation, so `moongose` provides a dedicated
// method for it. Find the (only!!) person having a certain Id,
// using `Model.findById() -> Person`.
// Use the function argument 'personId' as search key.

var findPersonById = function(personId, done) {
  Person.findById(personId,function(err,data){
    if(err) return console.error(err)
      done(null, data);
  })
  
```

#### Perform Classic Updates by Running Find, Edit, then Save

### <ins>Solution</ins>

`app.js`

```
var findEditThenSave = function(personId, done) {  
  var foodToAdd = 'hamburger';
  Person.findById(personId,function(err,dataPerson){ // dataPerson is a document returned by findByID() .
    if(err) return console.error(err);
    dataPerson.favoriteFoods.push(foodToAdd)
    dataPerson.save(function(err,data){ // SAVE the document
      if(err) return console.error(err);
      done(null, data);
    });
  })
  
};
// The above update of document combine of callbacks ,you can also do this by async function
  
```

#### Perform New Updates on a Document Using model.findOneAndUpdate()

### <ins>Solution</ins>

`app.js`

```
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,data){
    if(err) return console.error(err)
    done(null, data);
  })
  
}; 
// findOneAndUpdate method find the document and update it 
// By default this function do not return a update document ,so we have to pass another arguement ({new:true}) to return updated one.
  
```
#### Delete One Document Using model.findByIdAndRemove

### <ins>Solution</ins>

`app.js`

```
var removeById = function(personId, done) {
  Person.findOneAndRemove({_id:personId},function(err,data){
       if(err) return console.error(err)
    done(null, data);
  })
    
}; 
  
```

#### Delete Many Documents with model.remove()

### <ins>Solution</ins>

`app.js`

```
var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,data){
    if(err) return console.error(err)
    done(null, data);
  })

};
 // `Model.remove()` is useful to delete all the documents matching given criteria.
// Delete all the people whose name is "Mary", using `Model.remove()`.
// Pass to it a query ducument with the "name" field set, and of course a callback.

  
```

#### Chain Search Query Helpers to Narrow Search Results

### <ins>Solution</ins>

`app.js`

```
var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:false}).exec((err,data)=>{
     if(err) return console.error(err)
    done(null, data);  
  })
};
// to sort 1 represent 'ascending' , -1 for 'descending'
// to hide a property 'false'
  
```
