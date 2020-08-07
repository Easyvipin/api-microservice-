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
    "mongodb":"^3.6.0",
		"mongoose": "^5.9.20"
    
  }
  ```
  
 
`app.js`

```
// Add mongodb and mongoose to the project's package.json. Then require 
// mongoose. Store your Mongo Atlas database URI in the private .env file 
// as MONGO_URI. Connect to the database using the following syntax:
//
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

```
#### MongoDB and Mongoose - Create a Model

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
```



